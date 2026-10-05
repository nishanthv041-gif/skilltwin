"use client";

import Link from "next/link";
import { jsPDF } from "jspdf";

const roadmapWeeks = [
  {
    week: 1,
    focus: "Next.js App Router & Server Components",
    hours: 10,
    skills: ["Routing", "Server Components", "Suspense"],
    project: "Build a static blog with Next.js App Router",
    studyMaterial: "Week 1 Study Material:\n\n1. Understanding the App Router:\nThe new App Router in Next.js 13+ introduces a new paradigm for building applications. It uses Server Components by default, which means your React components run on the server and send pure HTML to the client. This reduces the JavaScript bundle size and improves performance.\n\n2. Server vs Client Components:\nUse Server Components for data fetching and backend access. Use Client Components (with 'use client') only when you need interactivity, state (useState), or lifecycle hooks (useEffect).\n\n3. Suspense and Streaming:\nSuspense allows you to show a fallback UI while your component's data is loading. Next.js natively supports streaming these chunks to the browser as they become ready.\n\n"
  },
  {
    week: 2,
    focus: "Advanced Data Fetching & Caching",
    hours: 12,
    skills: ["Data Fetching", "Caching Strategies", "Mutations"],
    project: "Add dynamic data fetching to the blog with revalidation",
    studyMaterial: "Week 2 Study Material:\n\n1. Fetch API:\nNext.js extends the native fetch API. By default, fetch requests are cached. You can control this using the 'cache' option (e.g., 'no-store' for dynamic data) or the 'next.revalidate' option for ISR.\n\n2. Server Actions:\nServer Actions allow you to run asynchronous code directly on the server, typically triggered by form submissions, without needing to manually build API endpoints.\n\n"
  },
  {
    week: 3,
    focus: "System Design for Scale",
    hours: 8,
    skills: ["Scalability", "Databases", "Edge Computing"],
    project: "Design document for a scalable Twitter clone",
    studyMaterial: "Week 3 Study Material:\n\n1. Database Connection Pooling:\nWhen deploying serverless Next.js apps, connecting directly to PostgreSQL can exhaust connection limits. Using PgBouncer or connection pooling services (like Prisma Data Proxy or Supabase) is critical.\n\n2. Edge vs Node.js runtime:\nEdge runtime is lightweight and fast, running close to the user, but lacks some Node.js APIs. Node.js runtime has full API access but may have cold boot times.\n\n"
  }
];

export default function RoadmapPage() {
  const downloadMaterial = (week: any) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    
    // Helper to draw Header
    const drawHeader = (title: string, subtitle: string) => {
      doc.setFillColor(11, 15, 25); // Dark blue/black header
      doc.rect(0, 0, pageWidth, 45, "F");
      
      doc.setTextColor(99, 102, 241); // Primary color
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("SkillTwin", margin, 20);
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text(title, margin, 32);
      
      doc.setTextColor(148, 163, 184);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(subtitle, pageWidth - margin, 32, { align: "right" });
    };

    // --- PAGE 1: Study Guide ---
    drawHeader(`Week ${week.week} Study Guide`, week.focus);
    
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("How to Master This Module", margin, 65);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(71, 85, 105);
    
    const introText = `Welcome to Week ${week.week}. To successfully complete this module, you must dedicate focused time to reading the core concepts, applying them in a sandbox environment, and completing the final capstone project. Do not rush. Understanding the 'why' is more important than memorizing the syntax.`;
    const splitIntro = doc.splitTextToSize(introText, pageWidth - (margin * 2));
    doc.text(splitIntro, margin, 75);
    
    let yPos = 75 + (splitIntro.length * 6) + 10;
    
    // Draw study material sections beautifully
    const materialParts = week.studyMaterial.split('\n\n');
    materialParts.forEach((part: string) => {
      if (part.trim() === "") return;
      if (part.includes("Study Material:")) return; // skip raw title
      
      if (part.match(/^[0-9]\./)) {
        // It's a header
        yPos += 5;
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(13);
        const splitHeader = doc.splitTextToSize(part, pageWidth - (margin * 2));
        doc.text(splitHeader, margin, yPos);
        yPos += (splitHeader.length * 6);
      } else {
        // It's body text
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.setFontSize(11);
        const splitBody = doc.splitTextToSize(part, pageWidth - (margin * 2));
        doc.text(splitBody, margin, yPos);
        yPos += (splitBody.length * 5) + 5;
      }
      
      // Page break logic
      if (yPos > 270) {
        doc.addPage();
        drawHeader(`Week ${week.week} Study Guide`, "Continued");
        yPos = 65;
      }
    });

    // --- PAGE 2: Roadmap Diagram ---
    doc.addPage();
    drawHeader("Execution Roadmap", "Step-by-Step Diagram");
    
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Your Path to Completion", margin, 65);

    const steps = [
      { title: "Theory & Concepts", desc: "Read documentation (2 hrs)", color: [99, 102, 241] },
      { title: "Code Walkthrough", desc: "Watch supplementary tutorials (2 hrs)", color: [20, 184, 166] },
      { title: "Local Sandbox", desc: "Practice snippets locally (2 hrs)", color: [245, 158, 11] },
      { title: "Mini Project", desc: week.project + " (3 hrs)", color: [239, 68, 68] },
      { title: "Verification", desc: "Take SkillTwin MCQ (1 hr)", color: [16, 185, 129] }
    ];

    let startY = 85;
    
    // Draw visual diagram
    steps.forEach((step, index) => {
      // Draw Line connecting nodes (except last)
      if (index < steps.length - 1) {
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(2);
        doc.line(margin + 10, startY + 10, margin + 10, startY + 35);
      }
      
      // Draw Node Circle
      doc.setFillColor(step.color[0], step.color[1], step.color[2]);
      doc.circle(margin + 10, startY, 6, "F");
      
      // Draw Inner Number
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}`, margin + 8.5, startY + 3.5);
      
      // Draw Text Box
      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin + 25, startY - 10, 140, 20, 3, 3, "FD");
      
      // Title
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(12);
      doc.text(step.title, margin + 30, startY - 1);
      
      // Desc
      doc.setTextColor(100, 116, 139);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(step.desc, margin + 30, startY + 6);
      
      startY += 30;
    });

    doc.save(`Week_${week.week}_Study_Material.pdf`);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} className="text-gradient">Your Learning Roadmap</h2>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>Step-by-step plan to reach your target role.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative' }}>
        {/* Vertical Timeline Line */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '3rem', width: '2px', background: 'linear-gradient(to bottom, var(--primary) 0%, var(--accent) 100%)', zIndex: 0, opacity: 0.3 }}></div>

        {roadmapWeeks.map((week, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '3rem', position: 'relative', zIndex: 1, animationDelay: `${idx * 150}ms` }} className="animate-fade-in">
            {/* Timeline Node */}
            <div style={{ flex: '0 0 6rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', backgroundColor: 'var(--bg-surface)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)', boxShadow: '0 0 15px rgba(99,102,241,0.3)', marginBottom: '0.5rem' }}>
                W{week.week}
              </div>
              <div className="badge" style={{ backgroundColor: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                {week.hours} hrs
              </div>
            </div>

            {/* Content Card */}
            <div className="card" style={{ flex: 1, padding: '2rem', borderLeft: '4px solid var(--primary)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>{week.focus}</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                <span className="text-muted" style={{ marginRight: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Focus Areas:</span>
                {week.skills.map((s, i) => (
                  <span key={i} className="badge">{s}</span>
                ))}
              </div>
              
              <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ fontSize: '1.5rem' }}>🛠️</div>
                <div>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Mini Project</h4>
                  <p className="text-muted" style={{ fontSize: '0.95rem' }}>{week.project}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <button 
                  onClick={() => downloadMaterial(week)} 
                  className="btn btn-secondary" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}
                >
                  📄 Download Material (PDF)
                </button>
                <Link 
                  href="/challenge" 
                  className="btn btn-primary" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}
                >
                  🎯 Take MCQ Challenge
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
