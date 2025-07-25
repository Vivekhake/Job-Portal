import React, { useState, useEffect } from "react";
import "./recruiterdashboard.css";

const RecruiterDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Dummy data with status field
    const dummyData = [
      {
        id: 1,
        studentName: "Vivek Hake",
        email: "vivek@example.com",
        jobTitle: "Frontend Developer",
        resumeUrl: "https://example.com/resume/vivek.pdf",
        status: "Pending",
      },
      {
        id: 2,
        studentName: "Priya Sharma",
        email: "priya@example.com",
        jobTitle: "Backend Developer",
        resumeUrl: "https://example.com/resume/priya.pdf",
        status: "Pending",
      },
    ];

    setApplications(dummyData);
  }, []);

  const handleAccept = (id) => {
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, status: "Accepted" } : app
    );
    setApplications(updatedApplications);
  };

  const handleDelete = (id) => {
    const updatedApplications = applications.filter((app) => app.id !== id);
    setApplications(updatedApplications);
  };

  return (
    <div className="recruiter-dashboard">
      <h2>Student Applications</h2>
      <table className="application-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app.id}>
                <td>{app.studentName}</td>
                <td>{app.email}</td>
                <td>{app.jobTitle}</td>
                <td>
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </td>
                <td>
                  <span
                    style={{
                      color: app.status === "Accepted" ? "green" : "gray",
                      fontWeight: "bold",
                    }}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  <button
                    className="accept-btn"
                    onClick={() => handleAccept(app.id)}
                    disabled={app.status === "Accepted"}
                  >
                    {app.status === "Accepted" ? "Accepted" : "Accept"}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(app.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No applications found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecruiterDashboard;
