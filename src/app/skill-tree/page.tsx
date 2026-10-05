import Link from "next/link";

export default function SkillTreePage() {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>Your Skill Tree</h2>
          <p className="text-muted">Visualize your learning progression.</p>
        </div>
        <Link href="/skill-gap" className="btn btn-secondary">
          Back to Gap Analysis
        </Link>
      </div>

      <div className="card" style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--bg-color)' }}>
        {/* Simple visual representation of a skill tree */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          
          <div className="card" style={{ border: '2px solid var(--success)', width: '300px' }}>
            <h3 style={{ color: 'var(--success)' }}>JavaScript (Proven)</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Level 4/4</p>
          </div>
          
          <div style={{ width: '2px', height: '40px', backgroundColor: 'var(--border)' }}></div>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div className="card" style={{ border: '2px solid var(--success)', width: '250px' }}>
              <h3 style={{ color: 'var(--success)' }}>React (Proven)</h3>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Level 3/4</p>
            </div>
            
            <div className="card" style={{ border: '2px dashed var(--warning)', width: '250px' }}>
              <h3 style={{ color: 'var(--warning)' }}>Node.js (Partial)</h3>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Level 2/4</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8rem' }}>
            <div style={{ width: '2px', height: '40px', backgroundColor: 'var(--border)' }}></div>
            <div style={{ width: '2px', height: '40px', backgroundColor: 'var(--border)' }}></div>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div className="card" style={{ border: '2px dotted var(--danger)', width: '250px', opacity: 0.8 }}>
              <h3 style={{ color: 'var(--danger)' }}>Next.js (Missing)</h3>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Level 0/4</p>
            </div>
            
            <div className="card" style={{ border: '1px solid var(--border)', width: '250px', opacity: 0.5 }}>
              <h3>System Design (Locked)</h3>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Prereq: Node.js Level 3</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
