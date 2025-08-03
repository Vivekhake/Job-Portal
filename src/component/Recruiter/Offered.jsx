import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Offered.css";

const Offered = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchOfferedCandidates();
  }, []);

  const fetchOfferedCandidates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/applications?status=offered"
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching offered candidates", error);
    }
  };

  return (
    <div className="offered-container">
      <h2>Offered Candidates</h2>
      {applications.length === 0 ? (
        <p>No candidates have been offered yet.</p>
      ) : (
        <table className="offered-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Resume</th>
              <th>Offered Date</th> {/* ✅ New column */}
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
                  <a href={app.resumeUrl} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>
                <td>
                  {app.offeredDate
                    ? new Date(app.offeredDate).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Offered;
