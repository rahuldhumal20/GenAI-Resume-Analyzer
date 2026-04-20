import { useState, useRef } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .ru-root {
    min-height: 100vh;
    background: #0c0c0e;
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,165,0,0.07) 0%, transparent 60%),
      repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.02) 39px, rgba(255,255,255,0.02) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.02) 39px, rgba(255,255,255,0.02) 40px);
    font-family: 'DM Mono', monospace;
    color: #e8e6e1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px 80px;
  }

  .ru-header {
    text-align: center;
    margin-bottom: 56px;
    animation: ru-fadein 0.7s ease both;
  }

  .ru-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #f59e0b;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .ru-eyebrow::before,
  .ru-eyebrow::after {
    content: '';
    width: 32px;
    height: 1px;
    background: #f59e0b;
    opacity: 0.5;
  }

  .ru-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 800;
    color: #f5f0e8;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }

  .ru-title span {
    color: #f59e0b;
  }

  .ru-subtitle {
    margin-top: 14px;
    font-size: 13px;
    color: #6b6860;
    letter-spacing: 0.02em;
    font-weight: 300;
  }

  .ru-card {
    width: 100%;
    max-width: 560px;
    background: #141416;
    border: 1px solid #2a2a2e;
    border-radius: 4px;
    padding: 40px;
    position: relative;
    animation: ru-fadein 0.7s 0.1s ease both;
  }

  .ru-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #f59e0b 50%, transparent);
    opacity: 0.6;
  }

  .ru-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: #f59e0b;
    border-style: solid;
    opacity: 0.5;
  }
  .ru-corner.tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
  .ru-corner.tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
  .ru-corner.bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
  .ru-corner.br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

  .ru-label {
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #5a5856;
    margin-bottom: 10px;
  }

  .ru-dropzone {
    border: 1px dashed #2e2e34;
    border-radius: 3px;
    padding: 40px 24px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    position: relative;
    background: #0f0f11;
  }

  .ru-dropzone:hover,
  .ru-dropzone.drag-over {
    border-color: #f59e0b;
    background: rgba(245,158,11,0.03);
  }

  .ru-dropzone input[type="file"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .ru-dropzone-icon {
    width: 40px;
    height: 40px;
    margin: 0 auto 14px;
    border: 1px solid #2a2a2e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5a5856;
    transition: border-color 0.2s, color 0.2s;
  }

  .ru-dropzone:hover .ru-dropzone-icon {
    border-color: #f59e0b;
    color: #f59e0b;
  }

  .ru-dropzone-text {
    font-size: 13px;
    color: #5a5856;
    line-height: 1.6;
  }

  .ru-dropzone-text strong {
    color: #c8c4bc;
    font-weight: 400;
  }

  .ru-file-selected {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(245,158,11,0.06);
    border: 1px solid rgba(245,158,11,0.2);
    border-radius: 3px;
    padding: 12px 16px;
    margin-top: 14px;
    animation: ru-fadein 0.3s ease;
  }

  .ru-file-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #f59e0b;
    flex-shrink: 0;
    animation: ru-pulse 2s infinite;
  }

  .ru-file-name {
    font-size: 12px;
    color: #c8c4bc;
    letter-spacing: 0.04em;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ru-file-clear {
    background: none;
    border: none;
    color: #5a5856;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 2px;
    transition: color 0.15s;
  }

  .ru-file-clear:hover { color: #e8e6e1; }

  .ru-divider {
    height: 1px;
    background: #1e1e22;
    margin: 28px 0;
  }

  .ru-btn {
    width: 100%;
    padding: 15px;
    background: #f59e0b;
    border: none;
    border-radius: 3px;
    color: #0c0c0e;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, opacity 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .ru-btn:hover:not(:disabled) {
    background: #fbbf24;
    transform: translateY(-1px);
  }

  .ru-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .ru-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .ru-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(0,0,0,0.2);
    border-top-color: #0c0c0e;
    border-radius: 50%;
    animation: ru-spin 0.7s linear infinite;
  }

  .ru-error {
    margin-top: 14px;
    padding: 12px 16px;
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.2);
    border-radius: 3px;
    font-size: 12px;
    color: #f87171;
    letter-spacing: 0.03em;
    animation: ru-fadein 0.3s ease;
  }

  .ru-status-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    font-size: 11px;
    color: #3a3a3e;
    letter-spacing: 0.06em;
  }

  .ru-status-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #3a3a3e;
  }

  .ru-status-dot.active {
    background: #22c55e;
    animation: ru-pulse 2s infinite;
  }

  @keyframes ru-fadein {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes ru-spin {
    to { transform: rotate(360deg); }
  }

  @keyframes ru-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

export default function ResumeUpload() {
  const [file, setFile] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const [jobDescription,setJobDescription]=useState("");

  const handleFile = (f) => {
    if (f && f.type === "application/pdf") {
      setFile(f);
      setError(null);
      setResult(null);
    } else if (f) {
      setError("Only PDF files are accepted.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if(!jobDescription.trim()){
    setError(
    "Please enter a job description."
    );
    return;
    }
    if (!file) { setError("Please select a PDF resume first."); return; }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append(
        "job_description",
        jobDescription
        );
      const res = await axios.post("https://genai-resume-analyzer-3yll.onrender.com/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      setError(
      typeof err?.response?.data?.detail==="string"
      ? err.response.data.detail
      : "Analysis failed. Ensure backend is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ru-root">
        <div className="ru-header">
          <div className="ru-eyebrow">AI-Powered System</div>
          <h1 className="ru-title">Resume <span>Screener</span></h1>
          <p className="ru-subtitle">Upload a PDF · Get instant analysis · Make better decisions</p>
        </div>

        <div className="ru-card">
          <div className="ru-corner tl" /><div className="ru-corner tr" />
          <div className="ru-corner bl" /><div className="ru-corner br" />

          <div className="ru-label">01 — Select Resume</div>
          <div
            className={`ru-dropzone${dragOver ? " drag-over" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".pdf"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <div className="ru-dropzone-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
            </div>
            <div className="ru-dropzone-text">
              <strong>Drop PDF here</strong><br />
              or click to browse files
            </div>
          </div>
          <div className="ru-divider" />

          <div className="ru-label">
          02 — Paste Job Description
          </div>

          <textarea
          value={jobDescription}
          onChange={(e)=>setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          style={{
          width:"100%",
          minHeight:"180px",
          background:"#0f0f11",
          border:"1px solid #2e2e34",
          color:"#e8e6e1",
          padding:"16px",
          fontFamily:"DM Mono",
          fontSize:"12px",
          borderRadius:"3px",
          outline:"none"
          }}
          />

          {file && (
            <div className="ru-file-selected">
              <div className="ru-file-dot" />
              <div className="ru-file-name">{file.name}</div>
              <button className="ru-file-clear" onClick={() => { setFile(null); setResult(null); }}>×</button>
            </div>
          )}

          {error && <div className="ru-error">⚠ {error}</div>}

          <div className="ru-divider" />

          <div className="ru-label">03 — Run Analysis</div>
          <button className="ru-btn" onClick={handleSubmit} disabled={loading || !file || !jobDescription.trim()}>
            {loading ? (
              <><div className="ru-spinner" /> Analyzing Resume…</>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Analyze Resume
              </>
            )}
          </button>

          <div className="ru-status-row">
            <div className={`ru-status-dot${loading ? " active" : ""}`} />
            {loading ? "Processing — this may take a moment" : "Endpoint: localhost:8000/analyze"}
          </div>
        </div>

        {result && <ResultCard result={result} />}
      </div>
    </>
  );
}