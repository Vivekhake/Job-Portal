import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SelectedPage.css";

const Selected = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchSelectedCandidates();
  }, []);

  const fetchSelectedCandidates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/applications?status=offered"
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching selected candidates", error);
    }
  };

  return (
    <div className="selected-container">
      <h2>Selected Candidates</h2>
      {applications.length === 0 ? (
        <p>No selected candidates found.</p>
      ) : (
        <table className="selected-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Resume</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
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
                <td className={`status-${app.status}`}>{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Selected;
