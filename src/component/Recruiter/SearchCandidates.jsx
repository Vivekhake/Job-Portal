import React, { useState } from "react";
import "./SearchCandidates.css";

const sampleCandidates = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    experience: "Experienced",
    role: "Frontend Developer",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    experience: "Fresher",
    role: "Backend Developer",
    skills: ["Java", "Spring Boot", "MySQL"],
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    experience: "Experienced",
    role: "Full Stack Developer",
    skills: ["Python", "Django", "React"],
  },
];

const SearchCandidates = () => {
  const [filter, setFilter] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const [candidates] = useState(sampleCandidates);

  const filteredCandidates = candidates.filter((candidate) => {
    const nameOrSkillMatch =
      candidate.name.toLowerCase().includes(filter.toLowerCase()) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(filter.toLowerCase())
      );

    const experienceMatch = !experience || candidate.experience === experience;

    const roleMatch = !role || candidate.role === role;

    return nameOrSkillMatch && experienceMatch && roleMatch;
  });

  return (
    <div className="recruiter-home-container">
      <h1 className="recruiter-header">Search Candidates</h1>

      <div className="filter-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or skill..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="filter-select"
        >
          <option value="">All Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="Experienced">Experienced</option>
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="filter-select"
        >
          <option value="">All Roles</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
        </select>
      </div>

      <div className="recruiter-card-grid">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="recruiter-card">
              <h2>{candidate.name}</h2>
              <p>Email: {candidate.email}</p>
              <p>Experience: {candidate.experience}</p>
              <p>Role: {candidate.role}</p>
              <p>Skills: {candidate.skills.join(", ")}</p>
              <a href={`/candidate/${candidate.id}`} className="recruiter-btn">
                View Profile
              </a>
            </div>
          ))
        ) : (
          <p>No candidates found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchCandidates;
