// src/components/CodeGenerator.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // note: ../ because this file is inside components/
import "../App.css"; // reuse your existing styles

function CodeGenerator() {
  const isLoggedIn = localStorage.getItem("token") != null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // notify app and redirect
    window.dispatchEvent(new Event('auth-change'));
    alert("Logged out successfully");
    navigate("/login");
  };

  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fromCache, setFromCache] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!question.trim()) {
      setError("Please enter a problem statement.");
      return;
    }

    setError("");
    setOutput("");
    setFromCache(null);
    setLoading(true);

    try {
      const res = await api.post("/generate", {
        question,
        language,
      });

      // prefer 'answer' then fallback to 'demo'
      setOutput(res.data.answer || res.data.demo || "");
      setFromCache(res.data.cached ?? null);
    } catch (err) {
      console.error("Axios error:", err);

      if (err.response && err.response.data && err.response.data.error) {
        setError("Server error: " + err.response.data.error);
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="generator-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div>
            <h2 style={{ margin: 0 }}>AI Code Generator</h2>
            <p className="sub" style={{ marginTop: 6 }}>Enter your problem and get optimized code in your chosen language.</p>
          </div>

          {isLoggedIn && (
            <div>
              <button className="btn-muted" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        <div className="form-field">
          <label>Problem Statement</label>
          <textarea
            rows={6}
            placeholder="Eg: Write a program to find the factorial of a number..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="form-field" style={{ maxWidth: 240 }}>
          <label>Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>
        </div>

        {error && <div className="error-text">{error}</div>}

        <div className="auth-actions" style={{ marginTop: 12 }}>
          <button className="btn-primary" onClick={handleGenerate} disabled={loading}>
            {loading ? (
              <>
                <span>Generating</span>
                <span className="spinner" />
              </>
            ) : (
              "Generate Code"
            )}
          </button>
          <button type="button" className="btn-muted" onClick={() => { setQuestion(''); setOutput(''); }}>
            Clear
          </button>
        </div>

        {output && (
          <div className="output-section" style={{ marginTop: 18 }}>
            <div className="output-header">
              <h3 style={{ margin: 0 }}>Generated Code</h3>
              {fromCache !== null && (
                <span className="badge">{fromCache ? "From Cache" : "From AI"}</span>
              )}
            </div>

            <pre>
              <code>{output}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeGenerator;
