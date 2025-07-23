// src/Navbar.js
import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "./UserContext ";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <h2 className="logo">Job Portal</h2>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div ref={menuRef} className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link
          to="/profile"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Profile
        </Link>

        {/* ✅ Role-Based Links */}
        {user && (
          <>
            {user.role === "STUDENT" && (
              <>
                <Link
                  to="/student-dashboard"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/student-profile"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/student-jobs"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Jobs & Internships
                </Link>
                <Link
                  to="/student-applications"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  My Applications
                </Link>
                <Link
                  to="/student-resume"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Resume Upload
                </Link>
              </>
            )}
            {user.role === "RECRUITER" && (
              <>
                <Link
                  to="/recruiter-dashboard"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/post-job"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Post a Job
                </Link>
                <Link
                  to="/my-jobs"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  My Job Listings
                </Link>
                <Link
                  to="/applications"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Applications Received
                </Link>
                <Link
                  to="/candidates"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Search Candidates
                </Link>
                <Link
                  to="/company-profile"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Company Profile
                </Link>
              </>
            )}
            {user.role === "ADMIN" && (
              <Link
                to="/admin-panel"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}
          </>
        )}

        <div className="nav-actions">
          {!user ? (
            <>
              <Link
                to="/login"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <div className="dropdown">
              <button className="dropbtn">{user.name} ⏷</button>
              <div className="dropdown-content">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
