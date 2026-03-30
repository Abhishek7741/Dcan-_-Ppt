import { useState, useEffect, useRef, useCallback } from 'react';

const INITIAL_PRICE = 150.00;
const BASE_TICK_RATE = 500; // ms

export function useMarketStream(impairments) {
  const [dataPoints, setDataPoints] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(INITIAL_PRICE);
  const [logs, setLogs] = useState([]);
  
  const truePriceRef = useRef(INITIAL_PRICE);
  const simulatedTimeRef = useRef(0);
  const outboxBufferRef = useRef([]);
  const intervalRef = useRef(null);

  const addLog = useCallback((type, message) => {
    setLogs(prev => {
      const newLogs = [{ time: new Date().toLocaleTimeString(), type, message }, ...prev];
      return newLogs.slice(0, 50); // Keep last 50 logs
    });
  }, []);

  // 1. Generate the TRUE market price perfectly every 500ms
  useEffect(() => {
    const generateTruePrice = () => {
      simulatedTimeRef.current += 1;
      
      // Random walk
      const volatility = 0.5;
      const change = (Math.random() - 0.5) * volatility;
      truePriceRef.current = Math.max(1, truePriceRef.current + change);
      
      const packet = {
        id: simulatedTimeRef.current,
        timestamp: Date.now(),
        price: Number(truePriceRef.current.toFixed(2)),
        valid: true
      };
      
      outboxBufferRef.current.push(packet);
    };

    const id = setInterval(generateTruePrice, BASE_TICK_RATE);
    return () => clearInterval(id);
  }, []);

  // 2. Deliver packets based on impairments
  useEffect(() => {
    // Delivery loop interval. We run this frequently to check the buffer
    const deliverPackets = () => {
      if (outboxBufferRef.current.length === 0) return;

      // Impairment: Network Congestion
      if (impairments.congestion) {
        // Freeze delivery! (Packets just queue in the buffer)
        if (Math.random() < 0.1) {
             addLog('warn', 'Network Congestion: Buffer filling up, packets delayed...');
        }
        return; 
      }

      let packetsToDeliver = [...outboxBufferRef.current];
      outboxBufferRef.current = []; // Clear buffer
      
      // If congestion was just turned OFF, there will be a burst!
      if (packetsToDeliver.length > 3) {
        addLog('warn', `Congestion relieved! Burst delivering ${packetsToDeliver.length} packets.`);
      }

      packetsToDeliver.forEach((packet) => {
        let finalPacket = { ...packet };

        // Impairment: Attenuation (Dropped Packets)
        if (impairments.attenuation && Math.random() < 0.3) {
          addLog('error', `Packet ${packet.id} dropped due to attenuation.`);
          return; // Drop packet
        }

        // Impairment: Noise (Data Corruption)
        if (impairments.noise && Math.random() < 0.2) {
          finalPacket.price = NaN;
          finalPacket.valid = false;
          addLog('error', `Noise corrupted packet ${packet.id} payload. CRC failed.`);
        } else {
           if (packetsToDeliver.length <= 1) {
              addLog('data', `Received valid packet ${packet.id}: $${packet.price}`);
           }
        }

        setDataPoints(prev => {
          const newData = [...prev, {
            time: new Date(finalPacket.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' }),
            truePrice: packet.price, 
            receivedPrice: finalPacket.valid ? finalPacket.price : null,
            corrupted: !finalPacket.valid
          }];
          return newData.slice(-40); // Keep last 40 points on chart
        });
        
        if (finalPacket.valid) {
          setCurrentPrice(finalPacket.price);
        }
      });
    };

    let tickRate = impairments.rateLimit ? 2500 : 250; 
    if (impairments.rateLimit) {
         if (Math.random() < 0.5) addLog('warn', 'Rate Limit Active: Effective bandwidth reduced.');
    }

    intervalRef.current = setInterval(deliverPackets, tickRate);
    
    return () => clearInterval(intervalRef.current);
  }, [impairments, addLog]);

  return { dataPoints, currentPrice, logs };
}
