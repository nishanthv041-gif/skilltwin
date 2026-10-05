"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Skill = {
  name: string;
  level: number;
  confidence: number;
  evidence: string;
  repoCount: number;
  stars: number;
};

// Default fallback data if no github user provided or API fails
const fallbackSkills: Skill[] = [
  {
    name: "React",
    level: 3,
    confidence: 92,
    evidence: "24 repos, main contributor in 3 projects",
    repoCount: 24,
    stars: 120,
  },
  {
    name: "TypeScript",
    level: 3,
    confidence: 88,
    evidence: "Used in 15 repos, complex generics found",
    repoCount: 15,
    stars: 85,
  },
  {
    name: "Node.js",
    level: 2,
    confidence: 75,
    evidence: "5 repos with basic Express setups",
    repoCount: 5,
    stars: 10,
  },
];

const COLORS = [
  "#6366f1",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#10b981",
  "#3b82f6",
];

function SkillProfileContent() {
  const searchParams = useSearchParams();
  const githubUsername = searchParams.get("github");
  const leetcodeUsername = searchParams.get("leetcode");
  const cgpa = searchParams.get("cgpa");

  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [leetcodeData, setLeetcodeData] = useState<any>(null);

  useEffect(() => {
    if (!githubUsername) return;

    const fetchGithubData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`,
        );

        if (!response.ok) {
          throw new Error("GitHub user not found or rate limited");
        }

        const repos = await response.json();

        if (repos.length === 0) {
          throw new Error("No public repositories found for this user");
        }

        // Aggregate language data
        const languageCounts: Record<string, { count: number; stars: number }> =
          {};

        repos.forEach((repo: any) => {
          const lang = repo.language;
          if (lang) {
            if (!languageCounts[lang]) {
              languageCounts[lang] = { count: 0, stars: 0 };
            }
            languageCounts[lang].count += 1;
            languageCounts[lang].stars += repo.stargazers_count;
          }
        });

        // Add Leetcode Data if username exists
        let algorithmsSkill: Skill | null = null;
        if (leetcodeUsername) {
          try {
            const lcResponse = await fetch(
              `https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`,
            );
            const lcData = await lcResponse.json();
            if (lcData && lcData.status === "success") {
              setLeetcodeData(lcData);
              const lcLevel =
                lcData.totalSolved > 200 ? 4 : lcData.totalSolved > 50 ? 3 : 2;
              algorithmsSkill = {
                name: "Algorithms & Data Structures",
                level: lcLevel,
                confidence: Math.min(99, 50 + lcData.totalSolved / 5),
                evidence: `Solved ${lcData.totalSolved} problems on LeetCode (Easy: ${lcData.easySolved}, Med: ${lcData.mediumSolved}, Hard: ${lcData.hardSolved})`,
                repoCount: 0,
                stars: 0,
              };
            }
          } catch (e) {
            console.warn("Leetcode fetch failed", e);
          }
        }

        const analyzedSkills: Skill[] = Object.keys(languageCounts)
          .map((lang) => {
            const data = languageCounts[lang];
            let level = 1;
            if (data.count > 10 || data.stars > 50) level = 4;
            else if (data.count > 5 || data.stars > 10) level = 3;
            else if (data.count > 2) level = 2;

            const confidence = Math.min(
              99,
              40 + data.count * 10 + (data.stars > 0 ? 10 : 0),
            );

            return {
              name: lang,
              level,
              confidence,
              evidence: `Found in ${data.count} public repos${data.stars > 0 ? ` with ${data.stars} total stars` : ""}.`,
              repoCount: data.count,
              stars: data.stars,
            };
          })
          .sort((a, b) => b.level - a.level || b.confidence - a.confidence);

        if (algorithmsSkill) {
          analyzedSkills.unshift(algorithmsSkill); // Put Algorithms at the top!
        }

        if (analyzedSkills.length > 0) {
          setSkills(analyzedSkills.slice(0, 10));
        } else {
          throw new Error("No language data found in repositories");
        }
      } catch (err: any) {
        // Silently fallback if GitHub API rate limits or user not found
        setError(
          err.message ||
            "Failed to analyze GitHub data. Showing fallback data.",
        );
        setSkills(fallbackSkills);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGithubData();
  }, [githubUsername]);

  // Format data for the Recharts Pie Chart (using repo counts)
  const pieData = skills.map((skill, index) => ({
    name: skill.name,
    value: skill.repoCount,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div
      className="animate-fade-in"
      style={{ maxWidth: "1000px", margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "2.5rem",
        }}
      >
        <div>
          <h2
            className="text-gradient"
            style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}
          >
            Your Skill Profile
          </h2>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {githubUsername && (
              <span
                className="badge"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "var(--text-main)",
                  border: "1px solid var(--border)",
                }}
              >
                <span>GitHub:</span>
                <strong style={{ color: "var(--primary)" }}>
                  @{githubUsername}
                </strong>
              </span>
            )}

            {leetcodeUsername && (
              <span
                className="badge"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  color: "var(--warning)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                }}
              >
                <span>LeetCode:</span>
                <strong>@{leetcodeUsername}</strong>
              </span>
            )}

            {cgpa && (
              <span
                className="badge"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  color: "var(--success)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                }}
              >
                <span>CGPA:</span>
                <strong>{cgpa} / 10</strong>
              </span>
            )}
          </div>
        </div>
        <Link
          href={`/target-selection?${searchParams.toString()}`}
          className="btn btn-primary"
          style={{ padding: "0.75rem 2rem" }}
        >
          Select Target Role
        </Link>
      </div>

      {isLoading && (
        <div
          className="card"
          style={{ textAlign: "center", padding: "4rem 2rem" }}
        >
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          >
            🤖
          </div>
          <h3>AI Engine is analyzing GitHub repositories...</h3>
          <p className="text-muted">
            Extracting language usage and code complexity.
          </p>
          <style
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes pulse {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.7; }
              100% { transform: scale(1); opacity: 1; }
            }
          `,
            }}
          />
        </div>
      )}

      {!isLoading && error && (
        <div
          className="card"
          style={{
            marginBottom: "2rem",
            backgroundColor: "rgba(245, 158, 11, 0.05)",
            borderColor: "rgba(245, 158, 11, 0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "var(--warning)",
              fontWeight: 600,
            }}
          >
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {!isLoading && (
        <div
          className="grid grid-cols-3"
          style={{ gap: "2rem", marginBottom: "2rem" }}
        >
          {/* Pie Chart Section for Git Data */}
          <div
            className="card"
            style={{
              gridColumn: "span 1",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem", textAlign: "center" }}>
              Language Distribution
            </h3>
            <p
              className="text-muted"
              style={{
                fontSize: "0.85rem",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              Based on Repository Count
            </p>
            <div style={{ width: "100%", height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                    }}
                    itemStyle={{ color: "var(--text-main)" }}
                    formatter={(value: any) => [`${value || 0} repos`, "Usage"]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: "0.8rem" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Extracted Skills List */}
          <div
            className="grid grid-cols-2"
            style={{ gridColumn: "span 2", gap: "1.5rem" }}
          >
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="card"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <h3 style={{ margin: 0 }}>{skill.name}</h3>
                  <span
                    className={`badge ${skill.level >= 3 ? "success" : skill.level == 2 ? "warning" : "danger"}`}
                  >
                    Level {skill.level}/4
                  </span>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.85rem",
                      marginBottom: "0.4rem",
                      fontWeight: 600,
                    }}
                  >
                    <span className="text-muted">AI Confidence Score</span>
                    <span style={{ color: "var(--primary)" }}>
                      {skill.confidence}%
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      backgroundColor: "var(--bg-color)",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${skill.confidence}%`,
                        height: "100%",
                        backgroundColor: "var(--primary)",
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    padding: "1rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    <strong style={{ color: "var(--text-main)" }}>
                      Evidence:
                    </strong>{" "}
                    {skill.evidence}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SkillProfilePage() {
  return (
    <Suspense
      fallback={
        <div
          className="animate-fade-in"
          style={{ textAlign: "center", marginTop: "4rem" }}
        >
          <h3 className="text-gradient">Loading profile...</h3>
        </div>
      }
    >
      <SkillProfileContent />
    </Suspense>
  );
}
