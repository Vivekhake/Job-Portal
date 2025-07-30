// src/components/ApplicationsReceived.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApplicationsReceived.css";

const ApplicationsReceived = () => {
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

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
        `http://localhost:8080/api/applications/${id}/update-status?status=${newStatus}`
      );
      fetchApplications();
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/applications/${id}`);
      fetchApplications();
    } catch (error) {
      console.error("Error deleting application", error);
    }
  };

  const filteredApps = selectedJob
    ? applications.filter((app) => app.jobTitle === selectedJob)
    : applications;

  return (
    <div className="applications-received">
      <h2>Applications Received</h2>

      <div className="filter-bar">
        <label>Filter by Job: </label>
        <select
          onChange={(e) => setSelectedJob(e.target.value)}
          value={selectedJob}
        >
          <option value="">All</option>
          {[...new Set(applications.map((a) => a.jobTitle))].map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      <table className="application-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Resume</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApps.map((app) => (
            <tr key={app.id}>
              <td>{app.studentName}</td>
              <td>{app.email}</td>
              <td>{app.jobTitle}</td>
              <td>
                <span
                  className={`status-badge ${app.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {app.status}
                </span>
              </td>
              <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
              <td>
                <a
                  href={`http://localhost:8080/uploads/${app.resumeUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 View Resume
                </a>
              </td>
              <td>
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(app.id, e.target.value)}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Offered">Offered</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button onClick={() => deleteApplication(app.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsReceived;
