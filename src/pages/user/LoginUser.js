import { useNavigate } from 'react-router-dom';

function LoginUser({ loginValues, setLoginValues }) {
  const navigate = useNavigate();

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
            <input
              type="password"
              value={loginValues.password}
              onChange={(e) =>
                setLoginValues((prev) => ({ ...prev, password: e.target.value }))
              }
              required
              placeholder="Your password"
            />

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
