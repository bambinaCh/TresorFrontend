import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/user/send-reset-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Recovery link sent to your email.');
        setEmail('');
      } else {
        setErrorMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setErrorMessage('Server error – please try again later.');
    }
  };

  return (
    <div className="register-wrapper">
      <h2 className="register-title">Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <div className="register-block">
          <label>Enter your email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />

          <button type="submit" className="register-button">Send Reset Link</button>

          {message && <p className="error-message" style={{ color: 'green' }}>{message}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
