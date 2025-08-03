import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shortlisted.css";

const ShortlistPage = () => {
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
      console.error("Error fetching applications:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      console.log(`Updating application ID ${id} to status: ${newStatus}`);
      await axios.put(
        `http://localhost:8080/api/applications/${id}/update-status`,
        null,
        { params: { status: newStatus } }
      );

      // Update local state for immediate UI update
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error(
        "Error updating application status:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="shortlist-container">
      <h2>Applications - Full History</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="shortlist-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Resume</th>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const isShortlisted =
                app.status?.trim().toLowerCase() === "shortlisted";

              return (
                <tr key={app.id}>
                  <td>{app.studentName}</td>
                  <td>{app.email}</td>
                  <td>{app.jobTitle}</td>
                  <td>
                    <a href={app.resumeUrl} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </td>
                  <td>{app.company}</td>
                  <td className={`status-${app.status?.toLowerCase()}`}>
                    {app.status}
                  </td>
                  <td>
                    <div className="button-group">
                      <button
                        className="btn1 accept"
                        disabled={!isShortlisted}
                        onClick={() => updateStatus(app.id, "Interview")}
                      >
                        Accept
                      </button>
                      <button
                        className="btn1 reject"
                        disabled={!isShortlisted}
                        onClick={() => updateStatus(app.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShortlistPage;
