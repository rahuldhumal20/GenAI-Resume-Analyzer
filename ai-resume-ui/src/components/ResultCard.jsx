const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  .rc-wrap {
    width: 100%;
    max-width: 560px;
    margin-top: 28px;
    animation: rc-rise 0.5s ease both;
  }

  .rc-label-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #5a5856;
  }

  .rc-label-row::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #1e1e22;
  }

  .rc-card {
    background: #141416;
    border: 1px solid #2a2a2e;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .rc-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #22c55e 50%, transparent);
    opacity: 0.7;
  }

  /* Score Hero */
  .rc-hero {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 32px 36px;
    border-bottom: 1px solid #1e1e22;
    position: relative;
    overflow: hidden;
  }

  .rc-hero::after {
    content: '';
    position: absolute;
    right: -20px; top: -20px;
    width: 160px; height: 160px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  .rc-score-block {
    flex-shrink: 0;
    margin-right: 32px;
    position: relative;
  }

  .rc-score-ring {
    width: 90px;
    height: 90px;
  }

  .rc-score-ring circle {
    fill: none;
    stroke-width: 5;
    stroke-linecap: round;
  }

  .rc-score-ring .ring-bg {
    stroke: #1e1e22;
  }

  .rc-score-ring .ring-fill {
    stroke: #22c55e;
    stroke-dasharray: 220;
    transform-origin: center;
    transform: rotate(-90deg);
    transition: stroke-dashoffset 1s cubic-bezier(.4,0,.2,1);
  }

  .rc-score-number {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
  }

  .rc-score-val {
    font-size: 22px;
    font-weight: 800;
    color: #f5f0e8;
    line-height: 1;
  }

  .rc-score-max {
    font-size: 10px;
    color: #3a3a3e;
    font-family: 'DM Mono', monospace;
    margin-top: 2px;
  }

  .rc-meta {
    flex: 1;
    min-width: 0;
  }

  .rc-category-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 2px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 10px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rc-category-pill.strong   { background: rgba(34,197,94,0.1);  color: #22c55e;  border: 1px solid rgba(34,197,94,0.2);  }
  .rc-category-pill.good     { background: rgba(34,197,94,0.07); color: #4ade80;  border: 1px solid rgba(34,197,94,0.15); }
  .rc-category-pill.average  { background: rgba(245,158,11,0.1); color: #f59e0b;  border: 1px solid rgba(245,158,11,0.2); }
  .rc-category-pill.weak     { background: rgba(239,68,68,0.09); color: #f87171;  border: 1px solid rgba(239,68,68,0.2);  }
  .rc-category-pill.default  { background: rgba(148,163,184,0.08); color: #94a3b8; border: 1px solid rgba(148,163,184,0.15); }

  .rc-category-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
    animation: rc-pulse 2s infinite;
  }

  .rc-score-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #3a3a3e;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .rc-score-bar-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rc-score-bar-track {
    flex: 1;
    height: 3px;
    background: #1e1e22;
    border-radius: 2px;
    overflow: hidden;
    min-width: 0;
  }

  .rc-score-bar-fill {
    height: 100%;
    background: #22c55e;
    border-radius: 2px;
    transition: width 1.2s cubic-bezier(.4,0,.2,1);
  }

  .rc-score-pct {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #5a5856;
    width: 28px;
    text-align: right;
    flex-shrink: 0;
  }

  /* Skills sections */
  .rc-skills-section {
    padding: 20px 36px;
    border-bottom: 1px solid #1a1a1e;
  }

  .rc-skills-section h3 {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #3a3a3e;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rc-skills-section h3::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #1a1a1e;
  }

  .rc-skills-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .rc-skill-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 2px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.03em;
  }

  .rc-skill-tag.matched {
    background: rgba(34,197,94,0.08);
    color: #22c55e;
    border: 1px solid rgba(34,197,94,0.2);
  }

  .rc-skill-tag.missing {
    background: rgba(239,68,68,0.08);
    color: #f87171;
    border: 1px solid rgba(239,68,68,0.2);
  }

  /* Body */
  .rc-body {
    padding: 28px 36px 32px;
  }

  .rc-section-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #3a3a3e;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rc-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #1a1a1e;
  }

  .rc-explanation {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .rc-section {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .rc-section-title {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #f5f0e8;
    padding: 6px 10px;
    background: rgba(255,255,255,0.04);
    border-left: 2px solid #f59e0b;
    margin-bottom: 10px;
  }

  .rc-point {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 9px 0;
    border-bottom: 1px solid #1a1a1e;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #8a8680;
    line-height: 1.7;
    font-weight: 300;
    letter-spacing: 0.01em;
  }

  .rc-point:last-child { border-bottom: none; }

  .rc-point-num {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    background: rgba(245,158,11,0.08);
    border: 1px solid rgba(245,158,11,0.15);
    color: #f59e0b;
    font-size: 10px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    font-family: 'DM Mono', monospace;
  }

  .rc-point-text {
    flex: 1;
    min-width: 0;
    word-break: break-word;
  }

  .rc-point-text strong {
    color: #c8c4bc;
    font-weight: 500;
  }

  .rc-plain-text {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #8a8680;
    line-height: 1.8;
    font-weight: 300;
    letter-spacing: 0.01em;
    padding: 4px 0;
    word-break: break-word;
  }

  .rc-plain-text strong {
    color: #c8c4bc;
    font-weight: 500;
  }

  /* Footer */
  .rc-footer {
    border-top: 1px solid #1a1a1e;
    padding: 14px 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .rc-footer-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #2a2a2e;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .rc-footer-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: #22c55e;
    letter-spacing: 0.08em;
  }

  .rc-footer-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #22c55e;
    flex-shrink: 0;
    animation: rc-pulse 2s infinite;
  }

  @keyframes rc-rise {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes rc-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* ── Mobile ────────────────────────────── */
  @media (max-width: 600px) {
    .rc-wrap {
      margin-top: 20px;
    }

    .rc-hero {
      padding: 20px 16px;
      flex-direction: column;
      align-items: flex-start;
      gap: 18px;
    }

    .rc-score-block {
      margin-right: 0;
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
    }

    .rc-score-ring {
      width: 72px;
      height: 72px;
      flex-shrink: 0;
    }

    .rc-score-val {
      font-size: 18px;
    }

    .rc-meta {
      width: 100%;
    }

    .rc-category-pill {
      font-size: 9px;
      padding: 3px 9px;
    }

    .rc-skills-section {
      padding: 16px 16px;
    }

    .rc-skill-tag {
      font-size: 10px;
      padding: 3px 8px;
    }

    .rc-body {
      padding: 20px 16px 24px;
    }

    .rc-section-title {
      font-size: 10px;
      letter-spacing: 0.12em;
    }

    .rc-point {
      font-size: 11px;
      gap: 10px;
    }

    .rc-point-num {
      width: 18px;
      height: 18px;
      font-size: 9px;
    }

    .rc-plain-text {
      font-size: 11px;
    }

    .rc-footer {
      padding: 12px 16px;
    }

    .rc-footer-tag {
      font-size: 9px;
      letter-spacing: 0.08em;
    }
  }
`;

function getCategoryClass(category = "") {
  const lower = category.toLowerCase();
  if (lower.includes("strong") || lower.includes("excellent")) return "strong";
  if (lower.includes("good"))    return "good";
  if (lower.includes("average") || lower.includes("moderate")) return "average";
  if (lower.includes("weak") || lower.includes("poor")) return "weak";
  return "default";
}

function getScoreColor(score) {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#f59e0b";
  return "#f87171";
}

// Renders inline **bold** markdown within a string
function InlineText({ text }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </>
  );
}

// Parses the explanation string into structured sections
function parseExplanation(text) {
  if (!text) return [];

  const sectionRegex = /\*\*([^*]+?):\*\*/g;
  const sections = [];

  const matches = [...text.matchAll(sectionRegex)];

  if (matches.length === 0) {
    return [{ title: null, content: text.trim() }];
  }

  matches.forEach((m, idx) => {
    const nextStart = matches[idx + 1]?.index ?? text.length;
    const content = text.slice(m.index + m[0].length, nextStart).trim();
    sections.push({ title: m[1], content });
  });

  return sections;
}

// Splits a section content into numbered points or plain lines
function parsePoints(content) {
  const numbered = content.split(/(?=\d+\.\s)/).map(s => s.trim()).filter(Boolean);
  if (numbered.length > 1 || /^\d+\.\s/.test(content.trim())) {
    return numbered.map(item => {
      const m = item.match(/^(\d+)\.\s+([\s\S]*)$/);
      return m ? { num: m[1], text: m[2].trim() } : { num: null, text: item };
    });
  }
  return [{ num: null, text: content }];
}

export default function ResultCard({ result }) {
  const score = Number(result.score) || 0;
  const circumference = 220;
  const offset = circumference - (score / 100) * circumference;
  const catClass = getCategoryClass(result.category);
  const scoreColor = getScoreColor(score);
  const sections = parseExplanation(result.explanation);

  return (
    <>
      <style>{styles}</style>
      <div className="rc-wrap">
        <div className="rc-label-row">03 — Analysis Result</div>
        <div className="rc-card">

          {/* Hero */}
          <div className="rc-hero">
            <div className="rc-score-block">
              <svg className="rc-score-ring" viewBox="0 0 90 90">
                <circle className="ring-bg" cx="45" cy="45" r="35" />
                <circle
                  className="ring-fill"
                  cx="45" cy="45" r="35"
                  style={{ strokeDashoffset: offset, stroke: scoreColor }}
                />
              </svg>
              <div className="rc-score-number">
                <span className="rc-score-val">{score}</span>
                <span className="rc-score-max">/100</span>
              </div>
            </div>

            <div className="rc-meta">
              <div className={`rc-category-pill ${catClass}`}>
                <div className="rc-category-dot" />
                {result.category || "Unclassified"}
              </div>
              <div className="rc-score-label">Overall Score</div>
              <div className="rc-score-bar-row">
                <div className="rc-score-bar-track">
                  <div
                    className="rc-score-bar-fill"
                    style={{ width: `${score}%`, background: scoreColor }}
                  />
                </div>
                <span className="rc-score-pct">{score}%</span>
              </div>
            </div>
          </div>

          {/* Matched Skills */}
          {result?.matched_skills?.length > 0 && (
            <div className="rc-skills-section">
              <h3>Matched Skills</h3>
              <div className="rc-skills-wrap">
                {result.matched_skills.map((skill, index) => (
                  <span key={index} className="rc-skill-tag matched">
                    ✔ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {result?.missing_skills?.length > 0 && (
            <div className="rc-skills-section">
              <h3>Missing Skills</h3>
              <div className="rc-skills-wrap">
                {result.missing_skills.map((skill, index) => (
                  <span key={index} className="rc-skill-tag missing">
                    ✖ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Explanation */}
          <div className="rc-body">
            <div className="rc-section-label">Explanation</div>
            <div className="rc-explanation">
              {sections.length === 0 ? (
                <p className="rc-plain-text">No explanation provided.</p>
              ) : (
                sections.map((section, si) => {
                  const points = parsePoints(section.content);
                  return (
                    <div className="rc-section" key={si}>
                      {section.title && (
                        <div className="rc-section-title">{section.title}</div>
                      )}
                      {points.map((pt, pi) =>
                        pt.num ? (
                          <div className="rc-point" key={pi}>
                            <div className="rc-point-num">{pt.num}</div>
                            <div className="rc-point-text">
                              <InlineText text={pt.text} />
                            </div>
                          </div>
                        ) : (
                          <p className="rc-plain-text" key={pi}>
                            <InlineText text={pt.text} />
                          </p>
                        )
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="rc-footer">
            <span className="rc-footer-tag">Resume Screener · AI Analysis</span>
            <div className="rc-footer-status">
              <div className="rc-footer-dot" />
              Complete
            </div>
          </div>
        </div>
      </div>
    </>
  );
}