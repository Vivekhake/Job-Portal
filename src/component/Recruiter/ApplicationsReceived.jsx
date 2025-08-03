import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApplicationsReceived.css";

const ApplicationsReceived = () => {
  const [applications, setApplications] = useState([]);

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
      console.error("Error fetching applications", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/applications/${id}/update-status`,
        null,
        {
          params: { status: newStatus },
        }
      );
      fetchApplications(); // Refresh list
    } catch (error) {
      console.error(`Error updating status to ${newStatus}`, error);
    }
  };

  const deleteApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/applications/${id}`);
      fetchApplications(); // Refresh list
    } catch (error) {
      console.error("Error deleting application", error);
    }
  };

  return (
    <div className="applications-container">
      <h2>Applications Received</h2>
      {applications.length === 0 ? (
        <p>No applications received yet.</p>
      ) : (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.studentName}</td>
                <td>{app.email}</td>
                <td>{app.jobTitle}</td>
                <td>{app.company}</td>
                <td>
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </td>
                <td>{app.status}</td>
                <td>
                  <button onClick={() => updateStatus(app.id, "shortlisted")}>
                    Accept
                  </button>
                  <button onClick={() => updateStatus(app.id, "rejected")}>
                    Reject
                  </button>
                  <button
                    onClick={() => deleteApplication(app.id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicationsReceived;
