import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMarketStream } from './hooks/useMarketStream';
import { Activity } from 'lucide-react';

function App() {
  const [impairments, setImpairments] = useState({
    noise: false,
    attenuation: false,
    congestion: false,
    rateLimit: false,
  });

  const { dataPoints, currentPrice, logs } = useMarketStream(impairments);

  const toggleImpairment = (key) => {
    setImpairments(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="dashboard-container">
      {/* LEFT COLUMN: VISUALS */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div className="header">
          <h1>Stock Market Live Feed</h1>
          <p>Ticker: EXMPL | Real-time Data Link</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
           <h2 style={{ fontSize: '36px', margin: 0, fontWeight: '700' }}>${currentPrice.toFixed(2)}</h2>
           <span style={{ color: impairments.congestion ? '#f59e0b' : 'var(--accent-green)' }}>
              {impairments.congestion ? '● Stalled...' : '● Live'}
           </span>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataPoints}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} />
              <YAxis domain={['auto', 'auto']} stroke="var(--text-muted)" fontSize={12} width={40} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-main)' }}
              />
              {/* The "True" price happening at the exchange */}
              <Line type="monotone" dataKey="truePrice" stroke="rgba(255,255,255,0.1)" strokeWidth={1} dot={false} isAnimationActive={false} />
              {/* The price received by the client */}
              <Line type="stepAfter" dataKey="receivedPrice" stroke="var(--accent-blue)" strokeWidth={2} dot={{ r: 3, fill: 'var(--bg-dark)' }} isAnimationActive={!!impairments.congestion} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RIGHT COLUMN: CONTROLS & TELEMETRY */}
      <div className="glass-panel">
        <div className="header">
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Activity color="var(--accent-blue)" />
             <h1>Control Panel</h1>
           </div>
          <p>Inject Physical & Network Impairments</p>
        </div>

        <div className="controls-section">
          <div className="toggle-row">
            <div className="toggle-label">
              <span className="toggle-title">Signal Noise</span>
              <span className="toggle-desc">Causes bits flipping, CRC failures, and corrupted packets.</span>
            </div>
            <button 
              className={`styled-button ${impairments.noise ? 'active danger' : ''}`}
              onClick={() => toggleImpairment('noise')}
            >
              {impairments.noise ? 'Corrupting' : 'Inject Noise'}
            </button>
          </div>

          <div className="toggle-row">
            <div className="toggle-label">
              <span className="toggle-title">Attenuation (Distance)</span>
              <span className="toggle-desc">Weakens signal, causing dropped packets missing from the timeline.</span>
            </div>
            <button 
              className={`styled-button ${impairments.attenuation ? 'active warning' : ''}`}
              onClick={() => toggleImpairment('attenuation')}
            >
              {impairments.attenuation ? 'Active' : 'Enable Drop'}
            </button>
          </div>

          <div className="toggle-row">
            <div className="toggle-label">
              <span className="toggle-title">Data Rate Limit</span>
              <span className="toggle-desc">Severely restrict bandwidth. Updates only every 2.5s.</span>
            </div>
            <button 
              className={`styled-button ${impairments.rateLimit ? 'active warning' : ''}`}
              onClick={() => toggleImpairment('rateLimit')}
            >
              {impairments.rateLimit ? 'Limited' : 'Throttle'}
            </button>
          </div>

          <div className="toggle-row">
            <div className="toggle-label">
              <span className="toggle-title">Network Congestion</span>
              <span className="toggle-desc">Pause delivery buffer, then burst forward (Flash Crash scenario).</span>
            </div>
            <button 
              className={`styled-button ${impairments.congestion ? 'active danger' : ''}`}
              onClick={() => toggleImpairment('congestion')}
            >
              {impairments.congestion ? 'Congested!' : 'Trigger Queue'}
            </button>
          </div>
        </div>

        <div className="metrics-grid">
           <div className="metric-card">
              <span className="metric-label">Effective Bandwidth</span>
              <span className={`metric-value ${impairments.rateLimit ? 'error' : 'good'}`}>
                {impairments.rateLimit ? '0.4 kB/s' : '1.2 kB/s'}
              </span>
           </div>
           <div className="metric-card">
              <span className="metric-label">Est. Latency</span>
              <span className={`metric-value ${impairments.congestion ? 'error' : (impairments.rateLimit ? 'warning' : 'good')}`}>
                {impairments.congestion ? '> 3000ms' : (impairments.rateLimit ? '250ms' : '12ms')}
              </span>
           </div>
        </div>

        <div className="logs-container">
          {logs.map((log, i) => (
            <div key={i} className="log-entry">
              <span className="log-time">[{log.time}]</span>
              <span className={`log-${log.type}`}>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
