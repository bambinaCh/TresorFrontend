import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmation) {
      setMessage('❌ Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (res.ok) {
        setMessage('✅ Password has been reset. Redirecting...');
        setTimeout(() => navigate('/user/login'), 2000);
      } else {
        const data = await res.json();
        setMessage(data.message || '❌ Something went wrong.');
      }
    } catch (error) {
      setMessage('❌ Network error.');
    }
  };

  return (
    <div className="register-wrapper">
      <h2 className="register-title">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="register-block">
          <label>New Password:</label>
          <input
            type="password"
            required
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password:</label>
          <input
            type="password"
            required
            placeholder="Repeat new password"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />

          <button type="submit" className="register-button">Reset Password</button>
          {message && <p className="error-message">{message}</p>}
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
