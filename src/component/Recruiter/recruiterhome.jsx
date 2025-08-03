// src/component/Recruiter/RecruiterHome.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./recruiterhome.css";

const RecruiterHome = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/candidates"
        );
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleView = (candidate) => {
    alert(
      `Candidate Details:\n\nSkills: ${candidate.skills}\nLocation: ${candidate.location}\nEducation: ${candidate.education}`
    );
  };

  // 🔍 Filtered candidates based on search term
  const filteredCandidates = candidates.filter((candidate) =>
    [candidate.role, candidate.skills].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/candidates/${id}`);
      // Remove the deleted candidate from local state
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate.id !== id)
      );
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  return (
    <div className="recruiter-home-container">
      <h1 className="recruiter-header">Recruiter Home Page</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by Role or skills..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredCandidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        <div className="cards-container">
          {filteredCandidates.map((candidate) => (
            <div className="candidate-card" key={candidate.id}>
              <h3>{candidate.studentName}</h3>
              <p>
                <strong>Email:</strong> {candidate.email}
              </p>
              <p>
                <strong>Role:</strong> {candidate.role}
              </p>

              <p>
                <strong>Skills:</strong> {candidate.skills}
              </p>
              <p>
                <strong>Location:</strong> {candidate.location}
              </p>
              <p>
                <strong>Education:</strong> {candidate.education}
              </p>
              <div className="button-group">
                <button
                  className="view-button"
                  onClick={() => handleView(candidate)}
                >
                  View
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(candidate.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecruiterHome;
