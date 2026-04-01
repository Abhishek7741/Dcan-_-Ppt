import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, Database, Building, Wifi, Network,
  CheckCircle, Clock, ArrowRight, ArrowLeft, RotateCcw, Box, Binary, Lock,
  Globe, Cpu
} from 'lucide-react';

const SCENES = [
  { id: 1, title: 'Trader Action', desc: 'The journey begins when a trader submits an order on their mobile device.', info: 'User Interface Interaction: Orders are human-initiated actions translated into API requests by the trading app.' },
  { id: 2, title: 'Binary Encoding', desc: 'The order data ("Buy 10 shares") is converted into a binary format (0s and 1s).', info: 'Digital Conversion: Human-readable text and numbers must be encoded into bits (base-2) for machine processing.' },
  { id: 3, title: 'Packet Formation', desc: 'Binary data is split into manageable chunks called Data Packets.', info: 'Data Serialization: Data is chunked into structured packets containing routing headers, payload data, and a CRC for error checking.' },
  { id: 4, title: 'Transmission Medium', desc: 'Packets travel through various physical and wireless networks across the globe.', info: 'Physical Layer: Electromagnetic signals traverse airwaves (wireless), copper cables, and optical fiber (speed of light pulses).' },
  { id: 5, title: 'Broker Validation', desc: 'The trading broker receives the packets, authenticates the user, and routes the order.', info: 'Authentication & Routing: Broker servers independently authenticate identity, verify available funds, and route to the correct exchange.' },
  { id: 6, title: 'Matching Engine Physics', desc: 'National Stock Exchange Processing System automatically matches buy and sell orders.', info: 'Market Mechanics: A continuous double auction automatically matches buyers and sellers using strict Price-Time priority rules.' },
  { id: 7, title: 'State Finality', desc: 'The match is confirmed, and the trade is officially executed.', info: 'Finality Protocol: Once a match occurs, the trade execution becomes a legally binding, unalterable, and digitally signed state.' },
  { id: 8, title: 'Return Duplex', desc: 'A confirmation signal is sent back through the network to update the trader\'s portfolio.', info: 'Bi-directional Routing: Network pathways are bi-directional; the exchange responds with packets validating the state change back to the client.' },
  { id: 9, title: 'Latency Horizon', desc: 'This entire global journey happens in the blink of an eye.', info: 'Latency Impact: This entire communication cycle occurs in ~20ms. Network impairments like latency, jitter, or packet drop severely compromise efficiency.' }
];

const springTransition = { type: 'spring', damping: 20, stiffness: 100 };
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};
const fadeInOut = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export const EducationalAnimation = () => {
  const [scene, setScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying && scene < 9) {
      timer = setTimeout(() => {
        setScene(s => s + 1);
      }, 5500); // 5.5 seconds per scene for pacing the rich animations
    } else if (isPlaying && scene === 9) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, scene]);

  const nextScene = () => setScene(s => Math.min(9, s + 1));
  const prevScene = () => setScene(s => Math.max(1, s - 1));
  const reset = () => { setScene(1); setIsPlaying(false); };

  const renderSceneContent = () => {
    switch(scene) {
      case 1:
        return (
          <motion.div key="scene1" variants={fadeInOut} initial="hidden" animate="visible" exit="exit" className="scene-content">
            <motion.div className="mobile-mockup-premium"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="notch"></div>
              <div className="mobile-header">
                <span className="font-space">NexusTrade</span>
                <Smartphone size={16} className="text-blue-neon" />
              </div>
              <div className="mobile-body">
                <p className="ticker-label">AAPL INC.</p>
                <motion.h1 className="stock-price"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={springTransition}
                >
                  $150.25
                </motion.h1>
                <div className="premium-glass-card mt-4">
                  <p><span>Quantity</span> <span className="text-white font-bold">10 Shares</span></p>
                  <p><span>Type</span> <span className="text-white font-bold">Market Order</span></p>
                </div>
                <motion.button 
                  className="buy-button-premium glass-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setScene(2); setIsPlaying(true); }}
                >
                  <Lock size={16}/> SECURE BUY
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div key="scene2" variants={fadeInOut} initial="hidden" animate="visible" exit="exit" className="scene-content flex-col items-center">
            <motion.div className="data-box-glass" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={springTransition}>
              <span className="text-2xl font-space font-bold tracking-widest text-white">"BUY 10 AAPL"</span>
            </motion.div>
            
            <motion.div className="my-8" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ArrowRight size={32} className="text-cyan-400 rotate-90 drop-shadow-neon" />
            </motion.div>

            <motion.div className="binary-stream-premium"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 1.5, ease: "anticipate" }}
            >
               <Binary size={32} className="text-cyan-400 mr-4" />
               <motion.div className="binary-scroller" animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 10, repeat: Infinity }}>
                 {'01000010 01010101 01011001 00100000 00110001 00110000 01100001 01110000 01101100 '.repeat(3)}
               </motion.div>
            </motion.div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div key="scene3" variants={fadeInOut} initial="hidden" animate="visible" exit="exit" className="scene-content">
            <motion.div className="flex items-center gap-12" variants={staggerContainer} initial="hidden" animate="visible">
               <motion.div className="font-space text-3xl text-cyan-400 drop-shadow-neon" variants={fadeInOut}>
                 01101001...
               </motion.div>
               <motion.div className="flex gap-4">
                 {[1,2,3,4].map((i) => (
                   <motion.div key={i} variants={fadeInOut} className="packet-cube">
                      <div className="packet-header">HDR</div>
                      <div className="packet-body">
                         <Box size={24} className="text-purple-400 mb-2 drop-shadow-neon-purple" />
                         <span className="text-xs text-center block">PAYLOAD {i}</span>
                      </div>
                      <div className="packet-footer">CRC</div>
                   </motion.div>
                 ))}
               </motion.div>
            </motion.div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div key="scene4" variants={fadeInOut} initial="hidden" animate="visible" exit="exit" className="scene-content flex-col" style={{ width: '100%' }}>
            <div className="transmission-grid">
               <motion.div className="trans-node" whileHover={{ scale: 1.05 }}>
                 <Wifi size={48} className="text-cyan-400 drop-shadow-neon" />
                 <span>Wireless Link</span>
               </motion.div>
               
               {/* Animated SVG Fiber Optic Path */}
               <div className="fiber-optic-path">
                 <svg width="400" height="100" viewBox="0 0 400 100">
                    <path d="M0,50 Q100,0 200,50 T400,50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                    <motion.path 
                       d="M0,50 Q100,0 200,50 T400,50" 
                       fill="none" 
                       stroke="#06b6d4" 
                       strokeWidth="4"
                       strokeLinecap="round"
                       initial={{ pathLength: 0, opacity: 0 }}
                       animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                       transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                       className="svg-glow-cyan"
                    />
                 </svg>
                 <span className="font-space text-cyan-400 tracking-widest mt-2 block text-center shadow-text">FIBER OPTIC BACKBONE</span>
               </div>

               <motion.div className="trans-node" whileHover={{ scale: 1.05 }}>
                 <Network size={48} className="text-purple-400 drop-shadow-neon-purple" />
                 <span>ISP Gateway</span>
               </motion.div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div key="scene5" variants={fadeInOut} initial="hidden" animate="visible" exit="exit" className="scene-content w-full relative">
            <div className="broker-datacenter">
              <motion.div className="server-tower"
                 initial={{ height: 0 }} animate={{ height: 250 }} transition={{ duration: 1, type: "spring" }}
              >
                {[1,2,3].map(i => (
                  <div key={i} className="server-blade">
                    <div className="blade-light-grid">
                      <motion.div className="dot" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: Math.random() + 0.5, repeat: Infinity }} />
                      <motion.div className="dot" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: Math.random() + 0.5, repeat: Infinity }} />
                      <motion.div className="dot" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: Math.random() + 0.5, repeat: Infinity }} />
                    </div>
                  </div>
                ))}
              </motion.div>
              
              <motion.div className="premium-glass-card broker-logs"
                 initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
              >
                 <h3 className="font-outfit text-2xl text-white mb-4 flex items-center gap-2">
                   <Shield_Icon /> Broker Routing
                 </h3>
                 <div className="log-line text-green-400">&gt; User Token: VERIFIED</div>
                 <div className="log-line text-green-400">&gt; Balance Check: PASSED</div>
                 <div className="log-line text-cyan-400">&gt; Destination: NASDAQ (FIX Protocol)</div>
                 <motion.div className="log-line text-purple-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>&gt; DISPATCHING...</motion.div>
              </motion.div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div key="scene6" variants={fadeInOut} initial="hidden" animate="visible" exit="exit" className="scene-content flex-col w-full h-full relative">
            <h2 className="font-space text-4xl text-center text-white mb-8 tracking-widest drop-shadow-neon uppercase">Market Matching Engine</h2>
            <div className="exchange-engine-container">
               <div className="order-column sell-column">
                  <div className="book-header text-red-500">ASK BOOK</div>
                  <motion.div className="order-row group" animate={{ x: [-10, 0] }} transition={{ duration: 0.5 }}>
                     <span>10</span><span>$150.28</span>
                  </motion.div>
                  <motion.div className="order-row group" animate={{ x: [-10, 0] }} transition={{ duration: 0.5, delay: 0.1 }}>
                     <span>100</span><span>$150.26</span>
                  </motion.div>
                  <motion.div className="order-row active-ask" animate={{ x: [20, 0], backgroundColor: ["rgba(239, 68, 68, 0.3)", "rgba(239, 68, 68, 0.1)"] }} transition={{ duration: 0.5, delay: 1.5 }}>
                     <span>10</span><span>$150.25</span>
                  </motion.div>
               </div>

               <div className="engine-core relative">
                 <Building size={80} className="text-purple-400 drop-shadow-neon-purple relative z-10" />
                 <motion.div className="core-pulse bg-purple-500/30" animate={{ scale: [1, 2], opacity: [0.8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                 {/* Match Spark */}
                 <motion.div className="match-spark absolute text-white font-bold text-xl drop-shadow-neon bg-white/10 px-4 py-1 rounded" 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
                    transition={{ delay: 2, duration: 0.5 }}
                 >
                    MATCH!
                 </motion.div>
               </div>

               <div className="order-column buy-column">
                  <div className="book-header text-green-400">BID BOOK</div>
                  <motion.div className="order-row active-bid" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.5, type: 'spring' }}>
                     <span>$150.25</span><span>10 (YOURS)</span>
                  </motion.div>
                  <motion.div className="order-row" animate={{ x: [10, 0] }} transition={{ duration: 0.5, delay: 0.1 }}>
                     <span>$150.23</span><span>50</span>
                  </motion.div>
                  <motion.div className="order-row" animate={{ x: [10, 0] }} transition={{ duration: 0.5 }}>
                     <span>$150.20</span><span>200</span>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        );

      case 7:
        return (
          <motion.div key="scene7" variants={fadeInOut} initial="hidden" animate="visible" exit="exit" className="scene-content justify-center items-center flex-col h-full">
            <motion.div 
               animate={{ rotateY: 360, scale: [0.8, 1.2, 1] }} 
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="mb-8"
            >
               <CheckCircle size={120} className="text-green-400 drop-shadow-neon-green" />
            </motion.div>
            <h1 className="font-outfit text-6xl text-white font-bold tracking-tight text-center drop-shadow-xl z-10">
               EXECUTED
            </h1>
            <p className="font-space text-2xl text-green-300 mt-4 tracking-widest uppercase">10 AAPL @ $150.25</p>
          </motion.div>
        );

      case 8:
        return (
          <motion.div key="scene8" variants={fadeInOut} initial="hidden" animate="visible" exit="exit" className="scene-content flex-col items-center justify-center">
             <div className="flex w-full max-w-3xl items-center justify-between relative mb-12 px-12">
               <Building size={64} className="text-purple-400 drop-shadow-neon-purple z-10" />
               <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
               </div>
               <motion.div className="z-10 bg-black/50 p-4 rounded-full border border-white/10 glass-glow"
                  initial={{ rotate: -15, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 2, type: 'spring' }}
               >
                 <Smartphone size={48} className="text-cyan-400 drop-shadow-neon" />
               </motion.div>
             </div>

             <motion.div className="premium-glass-card success-popup w-96 text-center overflow-hidden relative"
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2.5, type: 'spring' }}
             >
                <div className="absolute top-0 left-0 w-full h-1 bg-green-400" />
                <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                <h3 className="font-outfit text-3xl text-white font-bold">Portfolio Updated</h3>
                <p className="font-space text-green-300 text-xl font-bold mt-2">+ 10 AAPL</p>
             </motion.div>
          </motion.div>
        );

      case 9:
        return (
          <motion.div key="scene9" variants={fadeInOut} initial="hidden" animate="visible" exit="exit" className="scene-content flex-col justify-center items-center h-full text-center">
            <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="mb-8"
            >
               <Clock size={120} className="text-cyan-400 drop-shadow-neon opacity-80" />
            </motion.div>
            <h1 className="font-outfit text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 drop-shadow-2xl">
              MILLISECONDS
            </h1>
            <p className="font-space text-2xl text-white/80 max-w-2xl leading-relaxed">
              This global data round-trip traverses servers, matching engines, and optical fibers in approximately
            </p>
            <div className="mt-8 relative group cursor-crosshair">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative premium-glass-card !bg-black/80 px-12 py-6 flex flex-col">
                 <span className="font-outfit text-6xl text-white tabular-nums tracking-tighter">~23<span className="text-3xl text-cyan-400">ms</span></span>
                 <span className="font-space text-xs text-white/50 tracking-widest mt-2 uppercase">Average Execution Time</span>
              </div>
            </div>
          </motion.div>
        );
      
      default: return null;
    }
  };

  return (
    <div className="engine-wrapper dark-space-theme">
      {/* Dynamic Animated Background Elements */}
      <div className="ambient-background">
         <motion.div className="orb orb-cyan" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />
         <motion.div className="orb orb-purple" animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 12, repeat: Infinity, delay: 2 }} />
      </div>

      <div className="engine-layout">
        <header className="engine-header">
          <div className="flex flex-col">
            <h1 className="font-outfit text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
              Order Routing <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Masterclass</span>
            </h1>
            <p className="font-space text-sm text-cyan-300 tracking-widest uppercase mt-1">Data Flow Architecture</p>
          </div>
          <div className="step-badge-premium">
            <Globe className="text-cyan-400 animate-pulse" size={16} />
            STAGE {scene}/9
          </div>
        </header>

        <main className="engine-stage-glass">
          {/* Main Visual Arena */}
          <div className="visual-arena">
             <AnimatePresence mode="wait">
               {renderSceneContent()}
             </AnimatePresence>
          </div>

          {/* Key Concept Data Panel */}
          <motion.div className="concept-panel-premium" key={`info-${scene}`}
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          >
             <div className="flex items-start gap-4 h-full">
                <div className="icon-glow-box shrink-0">
                   <Cpu size={24} className="text-purple-300" />
                </div>
                <div className="flex flex-col w-full h-[100px] overflow-hidden">
                   <h3 className="font-outfit font-bold text-lg text-white mb-1 shadow-text">{SCENES[scene - 1].title}</h3>
                   <p className="text-base text-white/70 leading-relaxed font-sans">{SCENES[scene - 1].info}</p>
                </div>
             </div>
          </motion.div>
        </main>

        <footer className="engine-controls-glass">
          <div className="progress-track">
             <motion.div className="progress-fill bg-gradient-to-r from-cyan-400 to-purple-500" 
                initial={{ width: 0 }}
                animate={{ width: `${(scene / 9) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
             />
          </div>
          <div className="controls-nav mt-6 flex justify-between items-center px-4">
             <button className="nav-btn-hollow" onClick={reset} disabled={scene === 1 && !isPlaying}>
               <RotateCcw size={18} /> Restart
             </button>
             <div className="flex gap-4">
               <button className="nav-btn-hollow" onClick={prevScene} disabled={scene === 1}>
                 <ArrowLeft size={18} /> Prev
               </button>
               <button className={`nav-btn-solid ${isPlaying ? 'glow-play' : ''}`} onClick={() => setIsPlaying(!isPlaying)}>
                 {isPlaying ? 'PAUSE ENGINE' : 'AUTO PLAY'}
               </button>
               <button className="nav-btn-hollow" onClick={nextScene} disabled={scene === 9}>
                 Next <ArrowRight size={18} />
               </button>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

/* Helper Component */
const Shield_Icon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

export default EducationalAnimation;
