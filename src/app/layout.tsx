import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillTwin",
  description: "AI-Powered Skill Gap Analysis and Roadmap Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="page-wrapper">
          <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(11, 15, 25, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">
              <nav className="navbar" style={{ padding: '1.25rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" className="text-gradient" style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.05em' }}>
                  SkillTwin
                </Link>
                <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
                  <Link href="/profile" className="nav-link">Profile</Link>
                  <Link href="/skill-profile" className="nav-link">My Skills</Link>
                  <Link href="/target-selection" className="nav-link">Targets</Link>
                  <Link href="/roadmap" className="nav-link">Roadmap</Link>
                  <Link href="/demo" className="nav-link">Demo</Link>
                </div>
              </nav>
            </div>
          </header>
          <main className="main-content container animate-fade-in">
            {children}
          </main>
          <footer className="container" style={{ padding: '2rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>&copy; {new Date().getFullYear()} SkillTwin. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
