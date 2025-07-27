import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyApplications.css";

const MyApplications = () => {
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

  return (
    <div className="applications-container">
      <h2>📄 My Applications</h2>
      {applications.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Status</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.jobTitle}</td>
                <td>{app.company}</td>
                <td>{app.status}</td>
                <td>{app.appliedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyApplications;
