import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('📧 Email with reset instructions was sent.');
      } else {
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('Network error.');
    }
  };

  return (
    <div className="register-wrapper">
      <h2 className="register-title">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="register-block">
          <label>Email address:</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="register-button">Send reset link</button>
          {message && <p className="error-message">{message}</p>}
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
