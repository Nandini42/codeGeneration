import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../communicators/apicommunicators';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email.');
      return;
    }
    // Do not enforce a minimum password length on login to allow legacy accounts;
    // server-side authentication will determine validity.

    setLoading(true);
    try {
      const response = await login(formData);
      if (response?.status === 200) {
        localStorage.setItem('token', response.data.data);
        // notify app about auth change so routes update
        window.dispatchEvent(new Event('auth-change'));
        navigate('/generate');
      } else {
        setError(response?.data?.message || 'Login failed.');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="sub">Log in to continue to your AI Code Generator</p>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" required />
          </div>

          <div className="form-field" style={{ position: 'relative' }}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type={showPwd ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Your password" required />
            <button type="button" onClick={() => setShowPwd((s) => !s)} className="btn-muted" style={{ position: 'absolute', right: 8, top: 30 }}>
              {showPwd ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <div className="error-text">{error}</div>}

          <div className="auth-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (<><span>Signing in</span><span className="spinner"/></>) : 'Log In'}
            </button>
            <button type="button" className="btn-muted" onClick={() => navigate('/signup')}>Create an account</button>
          </div>
        </form>

        <div className="auth-footer">Forgot password? Contact support.</div>
      </div>
    </div>
  );
};

export default Login;
