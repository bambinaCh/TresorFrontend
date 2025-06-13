import { Outlet, Link } from "react-router-dom";

/**
 * Layout
 * @author Peter Rutschmann
 */
const Layout = ({ loginValues }) => {
  return (
    <>
      <nav className="main-nav">
        <div className="nav-header">
          <h1 className="app-title">The secret tresor application</h1>
          <span className="nav-user">
            {loginValues.email ? `User: ${loginValues.email}` : 'No user logged in'}
          </span>
        </div>

        <ul className="nav-links">
          <li>
            <span>Secrets ▾</span>
            <ul>
              <li><Link to="/secret/secrets">My secrets</Link></li>
              <li><Link to="/secret/newcredential">New credential</Link></li>
              <li><Link to="/secret/newcreditcard">New credit card</Link></li>
              <li><Link to="/secret/newnote">New note</Link></li>
            </ul>
          </li>
          <li>
            <span>User ▾</span>
            <ul>
              <li><Link to="/user/login">Login</Link></li>
              <li><Link to="/user/register">Register</Link></li>
            </ul>
          </li>
          <li>
            <span>Admin ▾</span>
            <ul>
              <li><Link to="/user/users">All users</Link></li>
              <li><Link to="/user/users/:id">Edit user</Link></li>
              <li><Link to="/">All secrets</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
