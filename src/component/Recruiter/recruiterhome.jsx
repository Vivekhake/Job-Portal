// src/component/Recruiter/RecruiterHome.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./recruiterhome.css";

const RecruiterHome = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("/api/candidates");
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        // Dummy fallback data
        setCandidates([
          {
            id: 1,
            name: "Anjali Sharma",
            email: "anjali@example.com",
            skills: ["React", "Node.js", "MongoDB"],
            location: "Bangalore",
            education: "B.Tech CSE - 2023",
          },
          {
            id: 2,
            name: "Rahul Mehta",
            email: "rahul@example.com",
            skills: ["Java", "Spring Boot", "MySQL"],
            location: "Delhi",
            education: "MCA - 2022",
          },
        ]);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="recruiter-home-container">
      <h1 className="recruiter-header">Recruiter Home Page</h1>
      <div className="recruiter-card-grid">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="recruiter-card">
            <h2>{candidate.name}</h2>
            <p>
              <strong>Email:</strong> {candidate.email}
            </p>
            <p>
              <strong>Skills:</strong> {candidate.skills.join(", ")}
            </p>
            <p>
              <strong>Location:</strong> {candidate.location}
            </p>
            <p>
              <strong>Education:</strong> {candidate.education}
            </p>
            <button className="recruiter-btn">View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterHome;
