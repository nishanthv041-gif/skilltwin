"use client";

import { useState } from "react";
import Link from "next/link";

const QUESTIONS = [
  {
    id: 1,
    question: "Which of the following Next.js features allows you to fetch data at request time and render HTML on the server?",
    options: ["Static Site Generation (SSG)", "Client-side Rendering (CSR)", "Server-Side Rendering (SSR)", "Incremental Static Regeneration (ISR)"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "When designing a scalable system, what is the main benefit of implementing a caching layer (like Redis)?",
    options: ["It permanently persists data if the main database crashes", "It automatically scales the application servers horizontally", "It reduces database load and decreases response latency", "It encrypts sensitive user data automatically"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "In the Next.js App Router, what is the default rendering environment for components inside the 'app' directory?",
    options: ["Client Components", "Server Components", "Static Components", "Edge Components"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Which directive must be placed at the top of a file to opt-in to Client Components in Next.js 13+?",
    options: ["'use client'", "'use server'", "'client only'", "'browser mode'"],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "What is the primary purpose of the 'Suspense' component in React?",
    options: ["To delay the execution of JavaScript", "To show a fallback UI while child components are loading asynchronous data", "To handle client-side routing transitions", "To catch Javascript errors in the component tree"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "Which data fetching function was deprecated in the Next.js App Router in favor of native fetch API?",
    options: ["getStaticProps", "getServerSideProps", "getInitialProps", "All of the above"],
    correctAnswer: 3
  },
  {
    id: 7,
    question: "How do you define a dynamic route segment in the Next.js App Router?",
    options: ["pages/[id].js", "app/(id)/page.js", "app/[id]/page.js", "app/dynamic/id/page.js"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "What feature in Next.js allows you to execute server-side code directly from client-side interactions (like form submissions) without manually writing an API route?",
    options: ["Server Actions", "Client Mutations", "Edge Functions", "API Handlers"],
    correctAnswer: 0
  },
  {
    id: 9,
    question: "Which of the following is true about Next.js Image component?",
    options: ["It automatically crops images to fit squares", "It converts all images to PNG format", "It automatically optimizes images with WebP and lazy loading", "It only works with local images"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "What does ISR (Incremental Static Regeneration) allow you to do?",
    options: ["Rebuild the entire site when a user visits", "Update static pages in the background without needing a full site rebuild", "Run a separate Node server to serve static assets", "Only render pages in the browser"],
    correctAnswer: 1
  }
];

const CODING_TASKS = [
  {
    id: 1,
    title: "Task 1: Asynchronous Data Fetching",
    description: "Write an async function named `mockFetch` that takes a user ID (number) and returns a Promise. The promise should resolve after 500ms with a string: 'Fetched user {ID}'. Use console.log to print the awaited result of mockFetch(42).",
    initialCode: "async function mockFetch(id) {\n  // Write your async logic here\n}\n\n// Await and console.log the result here\n",
    validator: (output: string) => output.includes("Fetched user 42")
  },
  {
    id: 2,
    title: "Task 2: Data Transformation",
    description: "You have an array of users: [{name: 'Alice', age: 25}, {name: 'Bob', age: 30}]. Write a function `getNames` that takes this array and returns a comma-separated string of only their names. Print the result using console.log.",
    initialCode: "const users = [{name: 'Alice', age: 25}, {name: 'Bob', age: 30}];\n\nfunction getNames(data) {\n  // Write your transformation logic here\n}\n\nconsole.log(getNames(users));\n",
    validator: (output: string) => output.includes("Alice, Bob") || output.includes("Alice,Bob")
  }
];

export default function ChallengePage() {
  const [currentStep, setCurrentStep] = useState<"intro" | "quiz" | "coding" | "result">("intro");
  
  // Quiz State
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState(0);

  // Coding State
  const [codingScores, setCodingScores] = useState<Record<number, boolean>>({});
  const [codeEditor, setCodeEditor] = useState<Record<number, string>>({
    1: CODING_TASKS[0].initialCode,
    2: CODING_TASKS[1].initialCode
  });
  const [outputs, setOutputs] = useState<Record<number, string>>({});

  const handleSelect = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    let calculatedScore = 0;
    QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        calculatedScore++;
      }
    });
    setQuizScore(calculatedScore);
    setCurrentStep("coding");
  };

  const runCode = async (taskId: number) => {
    let logs: string[] = [];
    const originalConsoleLog = console.log;
    
    console.log = (...args) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(" "));
    };
    
    try {
      setOutputs(prev => ({ ...prev, [taskId]: "Executing..." }));
      
      const execute = new Function(`
        return (async () => {
          ${codeEditor[taskId]}
        })();
      `);
      
      // Await the user's code execution
      await execute();
      
      // Wait slightly longer to catch any un-awaited promises (like setTimeout)
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const finalOutput = logs.join("\n");
      setOutputs(prev => ({ ...prev, [taskId]: finalOutput || "Executed with no output." }));
      validateCode(taskId, finalOutput);

    } catch (e: any) {
      setOutputs(prev => ({ ...prev, [taskId]: `Error: ${e.message}` }));
      validateCode(taskId, `Error: ${e.message}`);
    } finally {
      console.log = originalConsoleLog;
    }
  };

  const validateCode = (taskId: number, finalOutput: string) => {
    const task = CODING_TASKS.find(t => t.id === taskId);
    if (task && task.validator(finalOutput)) {
      setCodingScores(prev => ({ ...prev, [taskId]: true }));
    } else {
      setCodingScores(prev => ({ ...prev, [taskId]: false }));
    }
  };

  const handleCodeChange = (taskId: number, newCode: string) => {
    setCodeEditor(prev => ({ ...prev, [taskId]: newCode }));
  };

  const totalCodingScore = Object.values(codingScores).filter(v => v).length;
  const totalScore = quizScore + totalCodingScore;
  const maxScore = QUESTIONS.length + CODING_TASKS.length; // 12

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Technical Verification</h2>
        <p className="text-muted" style={{ fontSize: '1.1rem' }}>Prove your readiness: Theory & Practical</p>
      </div>

      {/* STEP 1: INTRO */}
      {currentStep === "intro" && (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎯</div>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Week 1 Assessment</h3>
          <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            This assessment contains 10 Multiple Choice Questions focusing on architecture, followed by 2 Live Coding Challenges testing data fetching and transformation. You need at least 9/{maxScore} total points to pass.
          </p>
          <button onClick={() => setCurrentStep("quiz")} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
            Start Challenge
          </button>
        </div>
      )}

      {/* STEP 2: MCQ QUIZ */}
      {currentStep === "quiz" && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Part 1: Theory (MCQs)</h3>
            <span className="badge">10 Questions</span>
          </div>

          {QUESTIONS.map((q, idx) => (
            <div key={q.id} className="card">
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>Q{idx + 1}.</span> {q.question}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {q.options.map((opt, optIdx) => (
                  <label 
                    key={optIdx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem', 
                      padding: '1rem', 
                      borderRadius: 'var(--radius-sm)', 
                      border: answers[q.id] === optIdx ? '2px solid var(--primary)' : '1px solid var(--border)',
                      backgroundColor: answers[q.id] === optIdx ? 'rgba(99,102,241,0.05)' : 'var(--bg-color)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input 
                      type="radio" 
                      name={`question-${q.id}`} 
                      checked={answers[q.id] === optIdx}
                      onChange={() => handleSelect(q.id, optIdx)}
                      style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }}
                    />
                    <span style={{ fontSize: '0.95rem' }}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button 
              onClick={handleQuizSubmit} 
              className="btn btn-primary" 
              style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
              disabled={Object.keys(answers).length !== QUESTIONS.length}
            >
              Continue to Coding Challenges ➡️
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: LIVE COMPILER */}
      {currentStep === "coding" && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <div>
              <h3>Part 2: Live Coding</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>Complete the 2 programming tasks below to test your applied knowledge.</p>
            </div>
            <span className="badge warning">JavaScript Compiler Attached</span>
          </div>

          {CODING_TASKS.map(task => (
            <div key={task.id} className="card" style={{ padding: 0, overflow: 'hidden', border: codingScores[task.id] === true ? '1px solid var(--success)' : '1px solid var(--border)' }}>
              {/* Editor Header */}
              <div style={{ padding: '1rem 1.5rem', backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{task.title}</strong>
                  <span className="text-muted" style={{ fontSize: '0.9rem', display: 'block', maxWidth: '500px' }}>{task.description}</span>
                </div>
                <button onClick={() => runCode(task.id)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                  ▶ Run Code
                </button>
              </div>

              {/* Code Editor */}
              <textarea
                value={codeEditor[task.id]}
                onChange={(e) => handleCodeChange(task.id, e.target.value)}
                spellCheck={false}
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '1.5rem',
                  backgroundColor: '#0d1117',
                  color: '#e6edf3',
                  fontFamily: 'monospace',
                  fontSize: '0.95rem',
                  border: 'none',
                  outline: 'none',
                  resize: 'vertical',
                  lineHeight: 1.6
                }}
              />

              {/* Terminal Output */}
              <div style={{ borderTop: '1px solid var(--border)', backgroundColor: '#010409', padding: '1rem 1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Compiler Output</span>
                  {outputs[task.id] && codingScores[task.id] === true && <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>✓ Test Passed</span>}
                  {outputs[task.id] && codingScores[task.id] === false && <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>✗ Test Failed</span>}
                </div>
                <pre style={{
                  margin: 0,
                  color: (outputs[task.id] && outputs[task.id].startsWith("Error")) ? '#ff7b72' : '#3fb950',
                  fontFamily: 'monospace',
                  fontSize: '0.95rem',
                  whiteSpace: 'pre-wrap',
                  minHeight: '60px'
                }}>
                  {outputs[task.id] || "Waiting for execution..."}
                </pre>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button 
              onClick={() => setCurrentStep("result")} 
              className="btn btn-primary" 
              style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
            >
              Submit Final Assessment
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RESULT */}
      {currentStep === "result" && (
        <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(${totalScore >= 9 ? 'var(--success)' : 'var(--danger)'} ${(totalScore/maxScore)*100}%, transparent 0)`, border: '2px solid var(--border)' }}>
             <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ fontSize: '2.5rem', fontWeight: '800', color: totalScore >= 9 ? 'var(--success)' : 'var(--danger)' }}>
                 {totalScore}/{maxScore}
               </span>
             </div>
          </div>

          {totalScore >= 9 ? (
            <>
              <h3 style={{ fontSize: '2rem', color: 'var(--success)', marginBottom: '1rem' }}>Challenge Passed! 🎉</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>Excellent work! You demonstrated strong architectural knowledge and practical coding ability.</p>
            </>
          ) : (
            <>
              <h3 style={{ fontSize: '2rem', color: 'var(--danger)', marginBottom: '1rem' }}>Needs Review</h3>
              <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>You didn't quite pass this time. Review the study materials and code concepts.</p>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {totalScore < 9 && (
              <button onClick={() => { setCurrentStep("intro"); setAnswers({}); setOutputs({}); setCodingScores({}); }} className="btn btn-secondary">
                Retry Challenge
              </button>
            )}
            <Link href="/roadmap" className="btn btn-primary">
              Return to Roadmap
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
