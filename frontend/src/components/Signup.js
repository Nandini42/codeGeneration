import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../communicators/apicommunicators';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const response = await signup(formData);
      if (response?.status === 201) {
        navigate('/login');
      } else {
        setError('Signup failed.');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create your account</h2>
        <p className="sub">Sign up to start generating code with AI</p>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="username">Full name</label>
            <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Your full name" required />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" required />
          </div>

          <div className="form-field" style={{ position: 'relative' }}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type={showPwd ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Create a password" required />
            <button type="button" onClick={() => setShowPwd((s) => !s)} className="btn-muted" style={{ position: 'absolute', right: 8, top: 30 }}>
              {showPwd ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <div className="error-text">{error}</div>}

          <div className="auth-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (<><span>Creating</span><span className="spinner"/></>) : 'Create account'}
            </button>
            <button type="button" className="btn-muted" onClick={() => navigate('/login')}>Already have an account? Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
