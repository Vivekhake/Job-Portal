// src/Navbar.js
import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
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
        {user && (
          <>
            {user.role === "STUDENT" && (
              <>
                <Link
                  to="/studenthomepage"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>

                <Link
                  to="/student-dashboard"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/jobs-internships"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Jobs & Internships
                </Link>

                {/* ✅ More Options Dropdown for Student */}
                <div className="dropdown">
                  <button className="dropbtn nav-link">More Options</button>
                  <div className="dropdown-content">
                    <Link
                      to="/student-profile"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/upload-resume"
                      onClick={() => setMenuOpen(false)}
                    >
                      Resume Upload
                    </Link>
                    <Link
                      to="/my-applications"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Applications
                    </Link>
                  </div>
                </div>
              </>
            )}

            {user.role === "RECRUITER" && (
              <>
                <NavLink
                  to="/recruiterhome"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/recruiterdashboard"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/post-job"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Post Job
                </NavLink>

                <NavLink
                  to="/applications"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Applications Received
                </NavLink>

                {/* ✅ More Options Dropdown for Recruiter */}
                <div className="dropdown">
                  <button className="dropbtn nav-link">More Options</button>
                  <div className="dropdown-content">
                    <NavLink
                      to="/company-profile"
                      className={({ isActive }) =>
                        `${isActive ? "active-link" : ""}`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Company Profile
                    </NavLink>
                    <NavLink
                      to="/myjobs"
                      className={({ isActive }) =>
                        `${isActive ? "active-link" : ""}`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      My Job Listings
                    </NavLink>
                    <NavLink
                      to="/shortlist"
                      className={({ isActive }) =>
                        `${isActive ? "active-link" : ""}`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Shortlisted
                    </NavLink>

                    <NavLink
                      to="/interview"
                      className={({ isActive }) =>
                        `${isActive ? "active-link" : ""}`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Interview
                    </NavLink>
                    <NavLink
                      to="/interviewScheduling"
                      className={({ isActive }) =>
                        `${isActive ? "active-link" : ""}`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Interview Scheduling
                    </NavLink>
                    <NavLink
                      to="/offered"
                      className={({ isActive }) =>
                        `${isActive ? "active-link" : ""}`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      Offered
                    </NavLink>
                  </div>
                </div>
              </>
            )}

            {user.role === "ADMIN" && (
              <>
                <Link
                  to="/admin-panel"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/admin-panel"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              </>
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
              <button className="dropbtn">{user.name}</button>
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
