"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("dark");
  const [apiToken, setApiToken] = useState("");
  
  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>System Settings</h2>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Profile & Theme</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Theme Preference</label>
          <select 
            className="input-field"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="dark">Dark Mode (Default)</option>
            <option value="light">Light Mode</option>
            <option value="system">System Default</option>
          </select>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>API Integrations</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>GitHub Personal Access Token</label>
          <input 
            type="password" 
            className="input-field" 
            placeholder="ghp_xxxxxxxxxxxx"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
          />
          <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Required for scanning private repositories.
          </p>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary">Save Preferences</button>
      </div>
    </div>
  );
}
