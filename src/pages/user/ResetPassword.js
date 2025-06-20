import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/users/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Password reset successful.');
        setNewPassword('');
      } else {
        setErrorMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setErrorMessage('Server error – please try again later.');
    }
  };

  return (
    <div className="register-wrapper">
      <h2 className="register-title">Set New Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="register-block">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter new password"
          />
          <button type="submit" className="register-button">Reset Password</button>
          {message && <p className="error-message" style={{ color: 'green' }}>{message}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
