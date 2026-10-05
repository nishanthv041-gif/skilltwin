"use client";

import { useRouter } from "next/navigation";

export default function DemoPage() {
  const router = useRouter();

  const handleDemoSelect = (persona: string) => {
    // In a real app, this would set the global state or session cookie
    console.log(`Selected persona: ${persona}`);
    router.push("/skill-profile");
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2>Demo Mode</h2>
        <p className="text-muted">Select a pre-configured persona to explore SkillTwin instantly.</p>
      </div>

      <div className="grid grid-cols-3">
        <div className="card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => handleDemoSelect('junior')}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
          <h3>Junior Dev</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Recent bootcamp grad looking for a Junior React Developer role.
          </p>
        </div>

        <div className="card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => handleDemoSelect('mid')}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
          <h3>Mid-Level Fullstack</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            3 years experience, transitioning to a Senior Node.js role.
          </p>
        </div>

        <div className="card" style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => handleDemoSelect('senior')}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
          <h3>Senior Architect</h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            10+ years experience, aiming for a Staff Engineer position.
          </p>
        </div>
      </div>
    </div>
  );
}
