"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

type GapData = { skill: string; current: number; required: number; gap: number; isBlocker: boolean; };

const DATASETS: Record<string, GapData[]> = {
  "Frontend Developer": [
    { skill: "React", current: 3, required: 4, gap: 1, isBlocker: false },
    { skill: "TypeScript", current: 3, required: 3, gap: 0, isBlocker: false },
    { skill: "Next.js", current: 0, required: 3, gap: 3, isBlocker: true },
    { skill: "CSS/Tailwind", current: 4, required: 3, gap: 0, isBlocker: false },
    { skill: "System Design", current: 1, required: 2, gap: 1, isBlocker: false },
  ],
  "Backend Developer": [
    { skill: "Node.js", current: 3, required: 4, gap: 1, isBlocker: false },
    { skill: "PostgreSQL", current: 1, required: 3, gap: 2, isBlocker: true },
    { skill: "Docker", current: 2, required: 3, gap: 1, isBlocker: false },
    { skill: "Redis", current: 0, required: 2, gap: 2, isBlocker: false },
    { skill: "System Architecture", current: 2, required: 4, gap: 2, isBlocker: true },
  ],
  "Data Scientist": [
    { skill: "Python", current: 4, required: 4, gap: 0, isBlocker: false },
    { skill: "Machine Learning", current: 2, required: 4, gap: 2, isBlocker: true },
    { skill: "SQL", current: 3, required: 3, gap: 0, isBlocker: false },
    { skill: "TensorFlow/PyTorch", current: 1, required: 3, gap: 2, isBlocker: true },
    { skill: "Data Visualization", current: 2, required: 3, gap: 1, isBlocker: false },
  ],
  "DevOps Engineer": [
    { skill: "Kubernetes", current: 1, required: 4, gap: 3, isBlocker: true },
    { skill: "AWS/GCP", current: 2, required: 3, gap: 1, isBlocker: false },
    { skill: "CI/CD Pipelines", current: 3, required: 4, gap: 1, isBlocker: false },
    { skill: "Terraform", current: 0, required: 3, gap: 3, isBlocker: true },
    { skill: "Linux Admin", current: 4, required: 3, gap: 0, isBlocker: false },
  ],
  "Data Engineer": [
    { skill: "Python", current: 3, required: 4, gap: 1, isBlocker: false },
    { skill: "SQL/Data Warehousing", current: 2, required: 4, gap: 2, isBlocker: true },
    { skill: "Apache Spark", current: 1, required: 3, gap: 2, isBlocker: true },
    { skill: "ETL Pipelines", current: 2, required: 4, gap: 2, isBlocker: false },
    { skill: "AWS/GCP Data Services", current: 1, required: 3, gap: 2, isBlocker: false },
  ],
  "Fullstack Developer": [
    { skill: "React/Next.js", current: 3, required: 4, gap: 1, isBlocker: false },
    { skill: "Node.js", current: 3, required: 3, gap: 0, isBlocker: false },
    { skill: "PostgreSQL", current: 1, required: 3, gap: 2, isBlocker: true },
    { skill: "System Design", current: 2, required: 3, gap: 1, isBlocker: false },
    { skill: "Docker", current: 2, required: 2, gap: 0, isBlocker: false },
  ],
  "default": [
    { skill: "Problem Solving", current: 3, required: 4, gap: 1, isBlocker: false },
    { skill: "Communication", current: 4, required: 3, gap: 0, isBlocker: false },
    { skill: "Domain Knowledge", current: 1, required: 3, gap: 2, isBlocker: true },
    { skill: "Tooling", current: 2, required: 3, gap: 1, isBlocker: false },
  ]
};

function SkillGapContent() {
  const searchParams = useSearchParams();
  
  const [role, setRole] = useState("Frontend Developer");
  const [company, setCompany] = useState("Google");
  const [gapData, setGapData] = useState<GapData[]>(DATASETS["Frontend Developer"]);
  const [readinessScore, setReadinessScore] = useState(65);

  useEffect(() => {
    const roleParam = searchParams.get("role");
    const companyParam = searchParams.get("company");
    
    if (roleParam) setRole(roleParam);
    if (companyParam) setCompany(companyParam);
    
    // Find matching dataset or default
    let matchKey = "default";
    if (roleParam) {
      const foundKey = Object.keys(DATASETS).find(k => roleParam.includes(k));
      if (foundKey) matchKey = foundKey;
    }
    
    const selectedData = DATASETS[matchKey] || DATASETS["default"];
    setGapData(selectedData);

    // Calculate readiness score dynamically based on the dataset
    const totalRequired = selectedData.reduce((acc, curr) => acc + curr.required, 0);
    const totalCurrent = selectedData.reduce((acc, curr) => acc + Math.min(curr.current, curr.required), 0);
    const score = Math.round((totalCurrent / totalRequired) * 100);
    setReadinessScore(score);

  }, [searchParams]);

  // Process data for the Pie Chart
  const pieData = [
    { name: "Ready", value: gapData.filter(g => g.gap === 0).length, color: "var(--success)" },
    { name: "Needs Work", value: gapData.filter(g => g.gap > 0 && !g.isBlocker).length, color: "var(--warning)" },
    { name: "Blocker", value: gapData.filter(g => g.isBlocker).length, color: "var(--danger)" },
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }} className="text-gradient">Skill Gap Analysis</h2>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>Target: {role} at {company}</p>
        </div>
        <Link href="/roadmap" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
          Generate Roadmap
        </Link>
      </div>

      <div className="grid grid-cols-3" style={{ gap: '2rem', marginBottom: '3rem' }}>
        {/* Readiness Score Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(${readinessScore > 75 ? 'var(--success)' : readinessScore > 50 ? 'var(--warning)' : 'var(--danger)'} ${readinessScore}%, transparent 0)`, border: '2px solid var(--border)' }}>
             <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ fontSize: '2.5rem', fontWeight: '800', color: readinessScore > 75 ? 'var(--success)' : readinessScore > 50 ? 'var(--warning)' : 'var(--danger)' }}>
                 {readinessScore}%
               </span>
             </div>
          </div>
          <p className="text-muted" style={{ marginTop: '1rem', fontWeight: 600 }}>Overall Readiness</p>
        </div>

        {/* Pie Chart Card */}
        <div className="card" style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Skill Distribution</h3>
          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }} 
                  itemStyle={{ color: 'var(--text-main)' }} 
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Blockers Card */}
        <div className="card" style={{ gridColumn: 'span 1', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🚨</span>
            <h3 style={{ color: 'var(--danger)', margin: 0 }}>Critical Blockers</h3>
          </div>
          <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>These skills are non-negotiable for the role and require immediate attention.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {gapData.filter(g => g.isBlocker).length === 0 ? (
              <div className="text-muted">No critical blockers found! 🎉</div>
            ) : (
              gapData.filter(g => g.isBlocker).map((skill, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--text-main)' }}>{skill.skill}</strong>
                  <span className="badge danger">Gap: -{skill.gap}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>Detailed Gap Breakdown</h3>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem' }}>Skill</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem' }}>Current Level</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem' }}>Required Level</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem' }}>Gap</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {gapData.map((item, idx) => (
              <tr key={idx} style={{ borderTop: '1px solid var(--border)', backgroundColor: idx % 2 === 0 ? 'var(--bg-surface)' : 'transparent', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? 'var(--bg-surface)' : 'transparent'}>
                <td style={{ padding: '1.25rem 1rem', fontWeight: 600 }}>{item.skill}</td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--bg-color)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${(item.current / 4) * 100}%`, height: '100%', backgroundColor: 'var(--primary)' }}></div>
                    </div>
                    <span>{item.current}/4</span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1rem' }}>{item.required}/4</td>
                <td style={{ padding: '1.25rem 1rem', fontWeight: 600, color: item.gap === 0 ? 'var(--text-muted)' : 'var(--text-main)' }}>
                  {item.gap > 0 ? `-${item.gap}` : 'Matched'}
                </td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <span className={`badge ${item.gap === 0 ? 'success' : item.isBlocker ? 'danger' : 'warning'}`}>
                    {item.gap === 0 ? 'Ready' : item.isBlocker ? 'Blocker' : 'Needs Work'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SkillGapPage() {
  return (
    <Suspense fallback={<div className="animate-fade-in" style={{ textAlign: 'center', marginTop: '4rem' }}><h3 className="text-gradient">Analyzing your skill profile...</h3></div>}>
      <SkillGapContent />
    </Suspense>
  );
}
