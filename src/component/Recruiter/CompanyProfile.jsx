import React, { useState } from "react";
import "./CompanyProfile.css";

const CompanyProfile = () => {
  const initialCompany = {
    name: "TechNova Inc.",
    industry: "Software Development",
    website: "https://www.technova.com",
    location: "Pune, Maharashtra, India",
    description:
      "TechNova is a leading provider of innovative software solutions.",
    founded: 2010,
    email: "hr@technova.com",
    logoUrl: "https://via.placeholder.com/120x120.png?text=Logo",
  };

  const [company, setCompany] = useState(initialCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialCompany);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setCompany(formData);
    setIsEditing(false);
  };

  return (
    <div className="company-profile">
      <h2>Company Profile</h2>

      {!isEditing ? (
        <>
          <div className="company-card">
            <img
              src={company.logoUrl}
              alt="Company Logo"
              className="company-logo"
            />
            <div className="company-details">
              <p>
                <strong>Company Name:</strong> {company.name}
              </p>
              <p>
                <strong>Industry:</strong> {company.industry}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={company.website}>{company.website}</a>
              </p>
              <p>
                <strong>Location:</strong> {company.location}
              </p>
              <p>
                <strong>Founded:</strong> {company.founded}
              </p>
              <p>
                <strong>Contact Email:</strong> {company.email}
              </p>
              <p>
                <strong>About:</strong> {company.description}
              </p>
            </div>
          </div>
          <div className="btn-container">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </div>
        </>
      ) : (
        <div className="edit-form">
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Industry:</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Website:</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Founded:</label>
            <input
              type="number"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="btn-container">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
