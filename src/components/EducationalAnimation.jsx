import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Database, Server, Building, Wifi, Cable, Network,
  CheckCircle, Clock, ArrowRight, ArrowLeft, RotateCcw, Box, Binary
} from 'lucide-react';

const SCENES = [
  { id: 1, title: 'Trader Action', desc: 'The journey begins when a trader submits an order on their mobile device.' },
  { id: 2, title: 'Binary Encoding', desc: 'The order data ("Buy 10 shares") is converted into a binary format (0s and 1s).' },
  { id: 3, title: 'Packet Formation', desc: 'Binary data is split into manageable chunks called Data Packets.' },
  { id: 4, title: 'Transmission Medium', desc: 'Packets travel through various physical and wireless networks across the globe.' },
  { id: 5, title: 'Broker Processing', desc: 'The trading broker receives the packets, authenticates the user, and routes the order.' },
  { id: 6, title: 'Order Matching Engine', desc: 'National Stock Exchange Processing System automatically matches buy and sell orders.' },
  { id: 7, title: 'Trade Execution', desc: 'The match is confirmed, and the trade is officially executed.' },
  { id: 8, title: 'Response to Trader', desc: 'A confirmation signal is sent back through the network to update the trader\'s portfolio.' },
  { id: 9, title: 'Time Factor', desc: 'This entire global journey happens in the blink of an eye.' }
];

export const EducationalAnimation = () => {
  const [scene, setScene] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying && scene < 9) {
      timer = setTimeout(() => {
        setScene(s => s + 1);
      }, 4000); // 4 seconds per scene
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
          <div className="scene-content">
            <div className="mobile-mockup">
              <div className="mobile-header">
                <span>TradingApp</span>
                <Smartphone size={16} />
              </div>
              <div className="mobile-body">
                <h2>APPL INC.</h2>
                <h1 className="stock-price">$150.25</h1>
                <div className="order-details">
                  <p>Quantity: 10 Shares</p>
                  <p>Type: Market Order</p>
                </div>
                <button className="buy-button pulse-btn">BUY 10 SHARES</button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="scene-content flex-column">
            <div className="transform-box">
              <span className="text-data">"BUY 10 SHARES APP INC"</span>
              <div className="arrow-down"><ArrowRight size={24} className="rotate-90" /></div>
              <div className="binary-stream">
                <Binary className="icon-glow" />
                <span className="binary-text">01000010 01010101 01011001 00100000 00110001 00110000...</span>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="scene-content">
            <div className="packet-container">
              <div className="binary-source">01000010...</div>
              <ArrowRight className="flow-arrow animated-arrow" size={32} />
              <div className="packets-grid">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`data-packet packet-anim delay-${i}`}>
                    <Box size={20} />
                    <span>Packet {i}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="label-badge mt-4">Packet Transmission</div>
          </div>
        );
      case 4:
        return (
          <div className="scene-content flex-space-even">
            <div className="medium-node">
              <Wifi size={48} className="signal-anim text-blue" />
              <span>Wireless Signal</span>
            </div>
            <div className="fiber-line">
              <div className="light-pulse"></div>
              <span>Optical Fiber</span>
            </div>
            <div className="medium-node">
              <Network size={48} className="pulse-slow text-green" />
              <span>Internet Grid</span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="scene-content">
            <div className="server-racks">
              <Database size={64} className="text-blue server-icon pulse-fast" />
              <div className="server-info">
                <h3>Brokerage Server</h3>
                <p>Authenticating User...</p>
                <p>Routing to Exchange...</p>
                <div className="data-flow-indicator">
                  <div className="moving-dot"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="scene-content flex-column">
            <h3 className="system-title text-neon">National Stock Exchange Processing System</h3>
            <div className="order-book">
              <Building size={48} className="text-purple exchange-icon" />
              <div className="matching-engine">
                <div className="order sell-side">SELL 10 @ $150.25</div>
                <div className="match-point pulse-fast">↔ MATCHING ↔</div>
                <div className="order buy-side">BUY 10 @ $150.25</div>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="scene-content success-view">
            <CheckCircle size={80} className="text-green pop-in" />
            <h2 className="success-text">Order Executed Successfully</h2>
            <p className="sub-text">10 shares of APPL @ $150.25</p>
          </div>
        );
      case 8:
        return (
          <div className="scene-content">
             <div className="response-journey">
                <Building size={32} className="text-purple" />
                <div className="return-path">
                   <div className="return-packet">✓</div>
                </div>
                <Smartphone size={32} className="text-blue" />
             </div>
             <div className="mobile-mockup mini mt-4">
                <h3 className="portfolio-update text-green">+ 10 APPL</h3>
                <p>Portfolio Value Updated</p>
             </div>
          </div>
        );
      case 9:
        return (
          <div className="scene-content time-view">
            <Clock size={100} className="text-blue spin-slow" />
            <h1 className="time-text text-neon">Entire process completed in milliseconds</h1>
            <p className="speed-stats">Round-trip time: ~12ms - ~35ms</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="edu-container">
      <div className="edu-header">
        <h1>Stock Market Data Journey</h1>
        <p>A Digital Communication Masterclass</p>
      </div>

      <div className="edu-main-panel glass-panel">
        <div className="scene-indicator">
          <span className="scene-badge">SCENE {scene}/9</span>
          <h2 className="scene-title">{SCENES[scene - 1].title}</h2>
          <p className="scene-desc text-muted">{SCENES[scene - 1].desc}</p>
        </div>

        <div className="scene-stage">
          {renderSceneContent()}
        </div>
      </div>

      <div className="edu-controls glass-panel">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${(scene / 9) * 100}%` }}></div>
        </div>
        
        <div className="controls-row">
          <button className="icon-btn" onClick={reset} disabled={scene === 1 && !isPlaying}>
            <RotateCcw size={20} /> Reset
          </button>
          <div className="nav-buttons">
            <button className="nav-btn" onClick={prevScene} disabled={scene === 1}>
              <ArrowLeft size={16} /> Prev
            </button>
            <button className={`nav-btn play-btn ${isPlaying ? 'playing' : ''}`} onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? 'Pause' : 'Auto-Play'}
            </button>
            <button className="nav-btn" onClick={nextScene} disabled={scene === 9}>
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalAnimation;
