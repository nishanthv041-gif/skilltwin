"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const COMPANIES = [
  "Google", "Apple", "Meta", "Amazon", "Netflix", 
  "Microsoft", "Stripe", "Vercel", "OpenAI", "Anthropic",
  "Spotify", "Uber", "Airbnb", "Discord", "Figma", 
  "Notion", "Linear", "Coinbase", "Shopify", "Databricks", 
  "Snowflake", "ByteDance", "Tesla", "SpaceX", "Palantir"
].sort();

const ROLES = [
  { group: "Frontend", titles: ["Frontend Developer", "UI Engineer", "React Developer", "Vue Developer"] },
  { group: "Backend", titles: ["Backend Developer", "Node.js Developer", "Go Engineer", "Python Engineer"] },
  { group: "Fullstack", titles: ["Fullstack Developer", "Product Engineer", "Software Engineer"] },
  { group: "Data & ML", titles: ["Data Scientist", "Machine Learning Engineer", "AI Researcher", "Data Engineer"] },
  { group: "Infrastructure", titles: ["DevOps Engineer", "Site Reliability Engineer", "Cloud Architect", "Security Engineer"] }
];

const LEVELS = ["Intern", "Junior (0-2 YOE)", "Mid-Level (2-5 YOE)", "Senior (5-8 YOE)", "Staff / Principal (8+ YOE)"];

export default function TargetSelectionPage() {
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedRole, setSelectedRole] = useState("Software Engineer");
  const [selectedLevel, setSelectedLevel] = useState("Mid-Level (2-5 YOE)");
  const [customJd, setCustomJd] = useState("");
  const [mode, setMode] = useState<"template" | "custom">("template");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      role: mode === 'template' ? selectedRole : 'Custom Role',
      company: mode === 'template' ? (selectedCompany || 'Tech Corp') : 'Custom Company',
    }).toString();
    router.push(`/skill-gap?${query}`);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="text-gradient">Target Role Configuration</h2>
        <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Define the exact role and company you are aiming for, or paste a specific job description to generate a highly personalized skill gap analysis.
        </p>
      </div>

      <div className="grid grid-cols-2" style={{ marginBottom: '2.5rem', gap: '1rem' }}>
        <div 
          className={`card ${mode === 'template' ? 'active-card' : ''}`} 
          style={{ cursor: 'pointer', border: mode === 'template' ? '2px solid var(--primary)' : '1px solid var(--border)', transition: 'all 0.3s ease' }}
          onClick={() => setMode("template")}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>🎯</div>
            <h3 style={{ margin: 0 }}>Role Template</h3>
          </div>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Use predefined, industry-standard skill requirements mapped to top tech companies.</p>
        </div>
        
        <div 
          className={`card ${mode === 'custom' ? 'active-card' : ''}`} 
          style={{ cursor: 'pointer', border: mode === 'custom' ? '2px solid var(--primary)' : '1px solid var(--border)', transition: 'all 0.3s ease', opacity: mode === 'custom' ? 1 : 0.7 }}
          onClick={() => setMode("custom")}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(20, 184, 166, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>📄</div>
            <h3 style={{ margin: 0 }}>Custom JD</h3>
          </div>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Paste a specific job description for precise matching against a live open role.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem' }}>
        {mode === "template" ? (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
              <div>
                <label className="form-label">Target Company</label>
                <select 
                  className="input-field professional-input"
                  value={selectedCompany}
                  onChange={e => setSelectedCompany(e.target.value)}
                >
                  <option value="" disabled>Select a top tech company...</option>
                  {COMPANIES.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                  <option value="other">Other / Not Listed</option>
                </select>
              </div>

              <div>
                <label className="form-label">Seniority Level</label>
                <select 
                  className="input-field professional-input"
                  value={selectedLevel}
                  onChange={e => setSelectedLevel(e.target.value)}
                >
                  {LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Role Category & Title</label>
              <select 
                className="input-field professional-input"
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
              >
                {ROLES.map((group, idx) => (
                  <optgroup key={idx} label={group.group}>
                    {group.titles.map(title => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Job Description</span>
              <span className="badge">AI Powered</span>
            </label>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
              Paste the entire job description below. Our AI will extract required skills, tools, and experiences.
            </p>
            <textarea 
              className="input-field professional-input" 
              rows={12}
              placeholder="e.g. We are looking for a Senior React Engineer with deep knowledge of Next.js, TypeScript, and state management..."
              value={customJd}
              onChange={e => setCustomJd(e.target.value)}
              required
            ></textarea>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
            Run Advanced Analysis
          </button>
        </div>
      </form>
    </div>
  );
}
