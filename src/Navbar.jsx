import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // for detecting outside clicks
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // 🧠 Outside click close logic
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
          to="/jobs"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Jobs
        </Link>
        <Link
          to="/companies"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Companies
        </Link>
        <Link
          to="/about"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          to="/profile"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          Profile
        </Link>

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
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
