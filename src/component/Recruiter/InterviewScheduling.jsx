import React, { useEffect, useState } from "react";
import axios from "axios";
import "./InterviewScheduling.css";

const InterviewPage = () => {
  const [applications, setApplications] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

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
      setUpdatingId(id);
      await axios.put(
        `http://localhost:8080/api/applications/${id}/update-status?status=${newStatus}`
      );
      await fetchApplications();
    } catch (error) {
      console.error(`Failed to update status for application ID ${id}:`, error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="interview-container">
      <h2>Interview Scheduling - All Application History</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="interview-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Status</th>
              <th>Resume</th>
              <th>Action</th>
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
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </td>
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
                  {app.status.toLowerCase() === "interviewscheduling" ? (
                    <>
                      <button
                        className="btn1 accept"
                        onClick={() => updateStatus(app.id, "offered")}
                        disabled={updatingId === app.id}
                      >
                        {updatingId === app.id ? "Updating..." : "Accept"}
                      </button>
                      <button
                        className="btn1 reject"
                        onClick={() => updateStatus(app.id, "rejected")}
                        disabled={updatingId === app.id}
                      >
                        {updatingId === app.id ? "Updating..." : "Reject"}
                      </button>
                    </>
                  ) : (
                    <span>—</span> // No actions for already updated ones
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InterviewPage;
