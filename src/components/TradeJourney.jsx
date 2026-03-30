import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Binary, Wifi, Route, Building2, Handshake, CheckCircle2, AlertTriangle, XCircle, Send } from 'lucide-react';

const STEPS = [
  { id: 0, title: 'Order Generation', desc: 'Trader initiates Buy/Sell', icon: ShoppingCart },
  { id: 1, title: 'Data Encoding', desc: 'Order to binary signal', icon: Binary },
  { id: 2, title: 'Network Medium', desc: 'Fiber / Wireless', icon: Wifi },
  { id: 3, title: 'Routing', desc: 'Travels as packets', icon: Route },
  { id: 4, title: 'Exchange', desc: 'Server receives data', icon: Building2 },
  { id: 5, title: 'Execution', desc: 'Matching engine sync', icon: Handshake },
  { id: 6, title: 'Confirmation', desc: 'Update sent to trader', icon: CheckCircle2 },
];

export function TradeJourney({ impairments }) {
  const [activeStep, setActiveStep] = useState(-1);
  const [packetStatus, setPacketStatus] = useState('idle'); // idle, moving, congested, dropped, corrupted, success, failed
  const [logs, setLogs] = useState([]);
  
  const timerRef = useRef(null);
  const impairmentsRef = useRef(impairments);

  // Keep ref updated to avoid stale closures in setTimeout
  useEffect(() => {
    impairmentsRef.current = impairments;
  }, [impairments]);

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }].slice(-5));
  };

  const startJourney = () => {
    if (activeStep !== -1 && activeStep !== 6 && packetStatus !== 'dropped' && packetStatus !== 'failed') {
      return; // Already running
    }
    
    // Reset state
    setLogs([]);
    setActiveStep(0);
    setPacketStatus('moving');
    addLog('Order generated: Buy 100 shares at ₹500', 'info');
    
    runStep(0, false);
  };

  const runStep = (currentIdx, isCorrupted) => {
    // Determine base delay for the jump
    let delay = impairmentsRef.current.rateLimit ? 1500 : 500;
    
    timerRef.current = setTimeout(() => {
      const nextIdx = currentIdx + 1;
      
      if (nextIdx > 6) {
        // Reached end without dropping
        if (isCorrupted) {
          setPacketStatus('failed');
          addLog('Trade failed: Order signature corrupted by Noise', 'error');
        } else {
          setPacketStatus('success');
          addLog('Trade confirmation received successfully (Milliseconds round-trip)', 'success');
        }
        return;
      }
      
      // Advance to next step
      let corruptedNow = isCorrupted;
      
      // Check Impairments at Network Nodes (Index 2 and 3)
      if (nextIdx === 2 || nextIdx === 3) {
        if (impairmentsRef.current.attenuation && Math.random() < 0.4) {
          // 40% chance to drop on these nodes if attenuation is active
          setActiveStep(nextIdx);
          setPacketStatus('dropped');
          addLog(`Packet dropped at ${STEPS[nextIdx].title} due to Attenuation (Signal weakening)`, 'error');
          return; // Stop journey
        }
        
        if (impairmentsRef.current.noise && !corruptedNow && Math.random() < 0.5) {
          corruptedNow = true;
          setPacketStatus('corrupted');
          addLog(`Signal corrupted by Noise at ${STEPS[nextIdx].title}! (Bits flipped)`, 'error');
        }
      }
      
      setActiveStep(nextIdx);
      
      // Special check for congestion AFTER moving into routing node
      if (nextIdx === 3 && impairmentsRef.current.congestion) {
        setPacketStatus('congested');
        addLog(`Network Congestion hit! Packet stuck in router buffer queue...`, 'warn');
        // Pause for an extra 3 seconds before continuing
        setTimeout(() => {
          setPacketStatus(corruptedNow ? 'corrupted' : 'moving');
          addLog(`Congestion burst! Packet suddenly forwarded to Exchange.`, 'info');
          runStep(nextIdx, corruptedNow);
        }, 3000);
      } else {
        if (!corruptedNow) setPacketStatus('moving');
        if (nextIdx === 4) addLog('Data reached Exchange server', 'info');
        if (nextIdx === 5 && !corruptedNow) addLog('Execution matched and trade processed', 'success');
        if (nextIdx === 5 && corruptedNow) addLog('Execution rejected due to invalid checksum!', 'error');
        
        runStep(nextIdx, corruptedNow);
      }
      
    }, delay);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="glass-panel" style={{ marginTop: '20px' }}>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h1>Lifecycle of a Trade</h1>
          <p>Watch how an order travels through the network, from generation to confirmation.</p>
        </div>
        <button className="styled-button active" onClick={startJourney} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Send size={16} /> Initate Sample Trade
        </button>
      </div>

      <div className="journey-track-container">
        <div className="journey-progress-line"></div>
        
        {/* The Animated "Packet" Dot */}
        {activeStep >= 0 && (
          <div 
            className={`journey-packet packet-${packetStatus}`}
            style={{ 
              left: `calc(${(activeStep / 6) * 100}% - 12px)`,
              transition: impairments.rateLimit ? 'left 1.5s linear' : 'left 0.5s ease-in-out'
            }}
          />
        )}

        <div className="journey-nodes">
          {STEPS.map((step, idx) => {
            const IconGroup = step.icon;
            const isPast = activeStep >= idx;
            const isCurrent = activeStep === idx;
            return (
              <div key={step.id} className={`journey-node ${isPast ? 'reached' : ''} ${isCurrent ? 'current' : ''}`}>
                <div className="node-icon">
                  <IconGroup size={24} />
                </div>
                <div className="node-label">{step.title}</div>
                <div className="node-desc">{step.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="journey-status-area">
        <div className="journey-logs">
          {logs.map((L, i) => (
             <div key={i} className={`log-entry log-${L.type}`}>
               <span className="log-time">[{L.time}]</span> {L.msg}
             </div>
          ))}
          {logs.length === 0 && <div className="log-entry" style={{color: 'var(--text-muted)'}}>Click "Initiate Sample Trade" to begin the cycle...</div>}
        </div>
        
        <div className="journey-legend">
          <div className="legend-item"><span className="packet-dot packet-moving"></span> Normal Transit</div>
          <div className="legend-item"><span className="packet-dot packet-congested"></span> Congested (Stuck)</div>
          <div className="legend-item"><span className="packet-dot packet-corrupted"></span> Corrupted (Noise)</div>
          <div className="legend-item"><span className="packet-dot packet-dropped"></span> Dropped (Lost)</div>
        </div>
      </div>
    </div>
  );
}
