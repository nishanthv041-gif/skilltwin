"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [github, setGithub] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [resume, setResume] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Redirect to skill profile with the user details
    const params = new URLSearchParams();
    if (github) params.append("github", github);
    if (leetcode) params.append("leetcode", leetcode);
    if (cgpa) params.append("cgpa", cgpa);
    
    router.push(`/skill-profile?${params.toString()}`);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Build Your Profile</h2>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>
        Connect your data sources so our AI can analyze your technical skills.
      </p>

      <form onSubmit={handleSubmit} className="card">
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>GitHub Username <span style={{ color: 'var(--danger)' }}>*</span></label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g. torvalds"
            value={github}
            onChange={e => setGithub(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>LeetCode Username</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. neetcode"
              value={leetcode}
              onChange={e => setLeetcode(e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>CGPA / Score</label>
            <input 
              type="number" 
              step="0.01"
              min="0"
              max="10"
              className="input-field" 
              placeholder="e.g. 8.5"
              value={cgpa}
              onChange={e => setCgpa(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Resume Text (Optional)</label>
          <textarea 
            className="input-field" 
            rows={4}
            placeholder="Paste your resume text here to provide additional context on your experiences..."
            value={resume}
            onChange={e => setResume(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
          {isSubmitting ? "Analyzing..." : "Build Skill Profile"}
        </button>
      </form>
    </div>
  );
}
