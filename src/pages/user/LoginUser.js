import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function LoginUser({ loginValues, setLoginValues }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("email", loginValues.email);
    navigate('/');
  };

  return (
    <div className="register-wrapper">
      <h2 className="register-title">Login user</h2>

      {/* Form ohne weißen Container */}
      <form onSubmit={handleSubmit}>
        <section className="register-flex">
          <aside className="register-block">
            <label>Email:</label>
            <input
              type="email"
              value={loginValues.email}
              onChange={(e) =>
                setLoginValues((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              placeholder="Your email"
            />

            <label>Password:</label>
            <div className="input-with-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                value={loginValues.password}
                onChange={(e) =>
                  setLoginValues((prev) => ({ ...prev, password: e.target.value }))
                }
                required
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="toggle-visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <p class="forgot-password-link">
              <a href="/user/forgot-password">Forgot password?</a>
            </p>

            <button type="submit" className="register-button">Login</button>
          </aside>
        </section>
      </form>
    </div>
  );
}

export default LoginUser;
