import Link from "next/link";

export default function HomePage() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '6rem', paddingBottom: '4rem' }}>
      
      {/* Hero Section */}
      <section style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center', 
        marginTop: '2rem',
        position: 'relative'
      }}>
        {/* Background Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(20,184,166,0.05) 50%, rgba(11,15,25,0) 70%)',
          zIndex: -1,
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ display: 'inline-block', padding: '0.25rem 1rem', borderRadius: '99px', backgroundColor: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '2rem' }}>
          ✨ SkillTwin AI Engine v2.0 is now live
        </div>

        <h1 style={{ 
          fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
          lineHeight: 1.1, 
          maxWidth: '900px', 
          margin: '0 auto 1.5rem',
          letterSpacing: '-0.03em'
        }}>
          Map your technical skills.<br/>
          <span className="text-gradient">Bridge the gap to your next role.</span>
        </h1>
        
        <p className="text-muted" style={{ 
          fontSize: '1.25rem', 
          maxWidth: '700px', 
          margin: '0 auto 3rem',
          lineHeight: 1.6
        }}>
          Connect your GitHub and resume. Our AI builds a digital twin of your capabilities and generates a precise, week-by-week learning roadmap to land your dream job at top tech companies.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/profile" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Start Building Profile
          </Link>
          <Link href="/demo" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            View Live Demo
          </Link>
        </div>
      </section>

      {/* Code Mockup / Visual Section */}
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '100%',
          maxWidth: '1000px',
          backgroundColor: '#0d1117',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
          overflow: 'hidden'
        }}>
          {/* Mac-style Window Controls */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
              skilltwin-analysis.json
            </div>
          </div>
          {/* Mock Content */}
          <div style={{ padding: '2rem', fontFamily: 'monospace', color: '#e6edf3', fontSize: '0.95rem', overflowX: 'auto', lineHeight: 1.6 }}>
            <div><span style={{ color: '#ff7b72' }}>import</span> {'{'} <span style={{ color: '#d2a8ff' }}>analyzeSkills</span>, <span style={{ color: '#d2a8ff' }}>generateRoadmap</span> {'}'} <span style={{ color: '#ff7b72' }}>from</span> <span style={{ color: '#a5d6ff' }}>&apos;@skilltwin/ai-engine&apos;</span>;</div>
            <br/>
            <div><span style={{ color: '#ff7b72' }}>const</span> <span style={{ color: '#79c0ff' }}>profile</span> <span style={{ color: '#ff7b72' }}>=</span> <span style={{ color: '#ff7b72' }}>await</span> <span style={{ color: '#d2a8ff' }}>analyzeSkills</span>({'{'}</div>
            <div>  github: <span style={{ color: '#a5d6ff' }}>&apos;torvalds&apos;</span>,</div>
            <div>  targetRole: <span style={{ color: '#a5d6ff' }}>&apos;Senior Staff Engineer&apos;</span>,</div>
            <div>  targetCompany: <span style={{ color: '#a5d6ff' }}>&apos;Google&apos;</span></div>
            <div>{'}'});</div>
            <br/>
            <div><span style={{ color: '#8b949e' }}>// Console Output:</span></div>
            <div><span style={{ color: '#79c0ff' }}>&gt;</span> Extracting repositories... <span style={{ color: '#3fb950' }}>[DONE]</span></div>
            <div><span style={{ color: '#79c0ff' }}>&gt;</span> Evaluating tech stack depth... <span style={{ color: '#3fb950' }}>[DONE]</span></div>
            <div><span style={{ color: '#79c0ff' }}>&gt;</span> Readiness Score: <span style={{ color: '#d2a8ff', fontWeight: 'bold' }}>82%</span></div>
            <div><span style={{ color: '#79c0ff' }}>&gt;</span> Critical Blocker: <span style={{ color: '#ff7b72' }}>System Architecture (Level 4 Required)</span></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem' }}>How It Works</h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>A seamless pipeline from analysis to job-readiness.</p>
        </div>

        <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
          <div className="card delay-100" style={{ padding: '2.5rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)', border: '1px solid rgba(99,102,241,0.2)' }}>
              1
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>AI Skill Extraction</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              We don&apos;t just read keywords. Our AI scans your actual code on GitHub and analyzes your resume to determine your true competency levels.
            </p>
          </div>
          
          <div className="card delay-200" style={{ padding: '2.5rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(20,184,166,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--accent)', border: '1px solid rgba(20,184,166,0.2)' }}>
              2
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Precision Gap Analysis</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              Compare your profile against actual job descriptions or predefined templates for Top 25 tech companies to instantly spot your blocker skills.
            </p>
          </div>

          <div className="card delay-300" style={{ padding: '2.5rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--warning)', border: '1px solid rgba(245,158,11,0.2)' }}>
              3
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Personalized Roadmaps</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              Generate a week-by-week learning plan with micro-projects and verification challenges designed to bridge your specific gaps.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="card" style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center', 
        background: 'linear-gradient(180deg, rgba(99,102,241,0.05) 0%, rgba(11,15,25,0) 100%)',
        border: '1px solid rgba(99,102,241,0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Stop guessing. Start bridging.</h2>
        <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Join thousands of developers who have optimized their learning paths and successfully landed roles at top tech companies.
        </p>
        <Link href="/profile" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
          Build Your Profile Now
        </Link>
      </section>
      
    </div>
  );
}
