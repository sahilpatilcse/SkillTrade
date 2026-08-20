import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = (path) => {
    return `px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-purple-600 text-white font-semibold"
        : "text-white hover:bg-purple-600 hover:text-purple-100"
    }`;
  };

  
  return (
    <nav className="bg-purple-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="text-white text-2xl font-bold hover:text-purple-200 transition"
        >
          SkillTrade
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/browse" className={navLinkClass("/browse")}>
            Browse
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className={navLinkClass("/dashboard")}>
                Dashboard
              </Link>

              <Link to="/requests" className={navLinkClass("/requests")}>
                Requests
              </Link>

              <Link
                to="/sentrequests"
                className={navLinkClass("/sentrequests")}
              >
                Sent Requests
              </Link>

              <span className="text-purple-100 text-sm hidden sm:block">
                Hi, {user.username}
              </span>

              <button
                onClick={handleLogout}
                className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLinkClass("/login")}>
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-100 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

