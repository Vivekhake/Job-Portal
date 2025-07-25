import React, { useState } from "react";
import "./studentHomePage.css";

const StudentHomePage = () => {
  const [applications, setApplications] = useState([]);

  const jobs = [
    {
      company: "Google",
      logo: "/images/google.png",
      title: "Frontend Developer",
      location: "Bangalore",
      type: "Full-time",
      description: "Work on modern UI using React.js and TypeScript.",
    },
    {
      company: "Amazon",
      logo: "/images/amazon.png",
      title: "Backend Developer",
      location: "Hyderabad",
      type: "Full-time",
      description: "Build scalable APIs and microservices using Java and AWS.",
    },
    {
      company: "Microsoft",
      logo: "/images/microsoft.png",
      title: "Cloud Engineer",
      location: "Noida",
      type: "Internship",
      description: "Assist with Azure deployments and monitoring tasks.",
    },
    {
      company: "Infosys",
      logo: "/images/infosys.png",
      title: "Software Analyst",
      location: "Pune",
      type: "Full-time",
      description: "Analyze software issues and support engineering teams.",
    },
    {
      company: "TCS",
      logo: "/images/tcs.png",
      title: "QA Tester",
      location: "Mumbai",
      type: "Contract",
      description:
        "Perform testing and quality assurance for web applications.",
    },
  ];

  const handleApply = (job) => {
    const newApplication = {
      company: job.company,
      title: job.title,
      status: "Applied",
      date: new Date().toLocaleDateString(),
    };
    setApplications((prev) => [...prev, newApplication]);
  };

  return (
    <div className="student-home-container">
      <h1 className="student-home-header">Welcome to Student Home Page</h1>

      {/* Profile Section */}
      <div className="student-home-section">
        <h2>👤 Profile</h2>
        <p>
          <strong>Name:</strong> Vivek Hake
        </p>
        <p>
          <strong>Email:</strong> vivek@example.com
        </p>
        <p>
          <strong>Degree:</strong> B.Tech CSE
        </p>
      </div>

      {/* Job Listings */}
      <div className="student-home-section">
        <h2>💼 Job Listings</h2>
        <div className="job-listing-row">
          {jobs.map((job, index) => (
            <div key={index} className="job-box">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="company-logo"
              />
              <h3>{job.title}</h3>
              <p>
                <strong>Company:</strong> {job.company}
              </p>
              <p>
                <strong>Location:</strong> {job.location} |{" "}
                <strong>Type:</strong> {job.type}
              </p>
              <p className="job-description">{job.description}</p>
              <div className="job-buttons">
                <button className="btn-apply" onClick={() => handleApply(job)}>
                  Apply
                </button>
                <button className="btn-join">Join</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Tracker */}
      <div className="student-home-section">
        <h2>📊 Application Tracker</h2>
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <table className="application-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={idx}>
                  <td>{app.company}</td>
                  <td>{app.title}</td>
                  <td>{app.status}</td>
                  <td>{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentHomePage;
