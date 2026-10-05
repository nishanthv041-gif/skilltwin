"use client";

import { useState } from "react";
import Link from "next/link";

export default function SimulatorPage() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  
  // Calculate projected weeks based on total hours needed (e.g. 120 hours total)
  const totalHoursNeeded = 120;
  const projectedWeeks = Math.ceil(totalHoursNeeded / Math.max(1, hoursPerWeek));
  
  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>What-If Simulator</h2>
          <p className="text-muted">Adjust your study time to see your readiness projection.</p>
        </div>
        <Link href="/roadmap" className="btn btn-secondary">
          View Roadmap
        </Link>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Learning Capacity</h3>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: 600 }}>Hours per Week: {hoursPerWeek}h</label>
            <span className="text-muted">Max: 40h</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="40" 
            value={hoursPerWeek} 
            onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div className="text-muted" style={{ marginBottom: '0.5rem' }}>Time to Job-Ready</div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              {projectedWeeks} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>weeks</span>
            </div>
          </div>
          
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div className="text-muted" style={{ marginBottom: '0.5rem' }}>Projected Readiness</div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--success)' }}>
              95%
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3>Skill Improvement Projection</h3>
        <p className="text-muted" style={{ marginBottom: '1rem' }}>Based on {hoursPerWeek} hours/week</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              <span>Next.js (Level 0 ➔ 3)</span>
              <span className="text-muted">Week {Math.ceil(projectedWeeks * 0.4)}</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '40%', height: '100%', backgroundColor: 'var(--primary)' }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              <span>System Design (Level 1 ➔ 2)</span>
              <span className="text-muted">Week {Math.ceil(projectedWeeks * 0.8)}</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '80%', height: '100%', backgroundColor: 'var(--accent)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
