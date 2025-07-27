import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ApplicationsReceived.css";

const ApplicationsReceived = () => {
  const [applications, setApplications] = useState([]);

  // 🔹 Fetch applications from backend
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/applications"
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // 🔹 Accept an application
  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/applications/${id}/accept`);
      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  // 🔹 Delete an application
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await axios.delete(`http://localhost:8080/api/applications/${id}`);
        fetchApplications(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    }
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

export default ApplicationsReceived;
