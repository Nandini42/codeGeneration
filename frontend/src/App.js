// import React, { useState } from "react";
// import api from "./api";
// import "./App.css";
// import Login from "./components/login";
// import Signup from "./components/Signup";

// function App() {

//   const isLoggedIn = (localStorage.getItem("token") != null);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     alert("Logged out successfully");
//     navigate('/login');
//   };
//   const [question, setQuestion] = useState("");
//   const [language, setLanguage] = useState("python");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fromCache, setFromCache] = useState(null);
//   const [error, setError] = useState("");

//   const handleGenerate = async () => {
//     if (!question.trim()) {
//       setError("Please enter a problem statement.");
//       return;
//     }

//     setError("");
//     setOutput("");
//     setFromCache(null);
//     setLoading(true);

//     try {
//       const res = await api.post("/generate", {
//         question,
//         language,
//       });

//       setOutput(res.data.answer || "");
//       setFromCache(res.data.cached);
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app-container">
//       <h1>AI Code Generator</h1>
//       <p className="subtitle">
//         Enter your problem and get optimized code in your chosen language.
//       </p>

//       <div className="form-section">
//         <label>Problem Statement</label>
//         <textarea
//           rows={6}
//           placeholder="Eg: Write a program to find the factorial of a number..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />

//         <label>Language</label>
//         <select
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//         >
//           <option value="python">Python</option>
//           <option value="java">Java</option>
//           <option value="cpp">C++</option>
//           <option value="c">C</option>
//         </select>

//         <button onClick={handleGenerate} disabled={loading}>
//           {loading ? "Generating..." : "Generate Code"}
//         </button>

//         {error && <p className="error">{error}</p>}
//       </div>

//       {output && (
//         <div className="output-section">
//           <div className="output-header">
//             <h2>Generated Code</h2>
//             {fromCache !== null && (
//               <span className="badge">
//                 {fromCache ? "From Cache" : "From AI"}
//               </span>
//             )}
//           </div>

//           <pre>
//             <code>{output}</code>
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import CodeGenerator from "./components/CodeGenerator";

import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handler = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('auth-change', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('auth-change', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  // NavBar removed from App — navbar is shown only on the Home page

  return (
    <Router>
      <Routes>
        {/* Home page when app starts */}
        <Route path="/" element={<Home />} />

        {/* Auth pages */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/generate" replace /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? <Navigate to="/generate" replace /> : <Signup />
          }
        />

        {/* Code generator (protected) */}
        <Route
          path="/generate"
          element={
            isLoggedIn ? <CodeGenerator /> : <Navigate to="/login" replace />
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
