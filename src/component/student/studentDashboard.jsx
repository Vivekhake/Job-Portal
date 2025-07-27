import React from "react";
import "./studentDashboard.css";

const studentDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>🎓 Student Dashboard</h1>

      <div className="dashboard-grid">
        {/* Profile Summary Card */}
        <div className="dashboard-card">
          <h3>👤 Profile Summary</h3>
          <p>Name: Vivek Hake</p>
          <p>Email: vivek@example.com</p>
          <p>College: ABC Institute of Technology</p>
        </div>

        {/* Resume Status */}
        <div className="dashboard-card">
          <h3>📄 Resume Status</h3>
          <p>Uploaded on: July 25, 2025</p>
          <button className="btn">Update Resume</button>
        </div>

        {/* Applied Jobs */}
        <div className="dashboard-card">
          <h3>💼 Applied Jobs</h3>
          <ul>
            <li>Frontend Developer - Google</li>
            <li>Backend Developer - Amazon</li>
          </ul>
        </div>

        {/* Application Stats */}
        <div className="dashboard-card">
          <h3>📊 Application Stats</h3>
          <p>Jobs Applied: 5</p>
          <p>Interviews: 2</p>
          <p>Offers: 1</p>
        </div>
      </div>
    </div>
  );
};

export default studentDashboard;
