import React, { useEffect, useState } from "react";
import "./recruiterdashboard.css";

const RecruiterDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Replace this with API call in real app
    const dummyApplications = [
      {
        id: 1,
        studentName: "Vivek Hake",
        email: "vivek@example.com",
        jobTitle: "Frontend Developer",
        status: "Pending",
      },
      {
        id: 2,
        studentName: "Anjali Sharma",
        email: "anjali@example.com",
        jobTitle: "Backend Developer",
        status: "Shortlisted",
      },
    ];
    setApplications(dummyApplications);
  }, []);

  return (
    <div className="recruiter-dashboard">
      <h1>Recruiter Dashboard</h1>
      <div className="applications-grid">
        {applications.map((app) => (
          <div className="application-card" key={app.id}>
            <h3>{app.jobTitle}</h3>
            <p>
              <strong>Applicant:</strong> {app.studentName}
            </p>
            <p>
              <strong>Email:</strong> {app.email}
            </p>
            <p>
              <strong>Status:</strong> {app.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
