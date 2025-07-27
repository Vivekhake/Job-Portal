import React, { useState } from "react";
import axios from "axios";
import "./studentprofile.css"; // Add CSS

const StudentProfileForm = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    collegeName: "",
    startYear: "",
    endYear: "",
    cgpa: "",
    github: "",
    linkedin: "",
    keySkills: "",
    experience: "",
    projects: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleProfileImageChange = (e) => {
    setProfileImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const multipartForm = new FormData();
    multipartForm.append(
      "studentProfile",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    if (resumeFile) multipartForm.append("resume", resumeFile);
    if (profileImageFile)
      multipartForm.append("profileImage", profileImageFile);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/student-profile",
        multipartForm,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ Upload success:", response.data);

      // Save the complete student object returned from backend (including resumePath, imagePath)
      localStorage.setItem("student", JSON.stringify(response.data));
    } catch (error) {
      console.error("❌ Upload failed:", error);
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>👤 Personal Details</legend>
        <div className="role">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="role">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Mobile"
            required
          />
        </div>
        <div className="role">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="State"
          />
        </div>
        <div className="role">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
          />
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            placeholder="Zip Code"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>🎓 Education</legend>
        <div className="role">
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleInputChange}
            placeholder="College Name"
          />
          <input
            type="number"
            name="startYear"
            value={formData.startYear}
            onChange={handleInputChange}
            placeholder="Start Year"
          />
        </div>
        <div className="role">
          <input
            type="number"
            name="endYear"
            value={formData.endYear}
            onChange={handleInputChange}
            placeholder="End Year"
          />
          <input
            type="text"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleInputChange}
            placeholder="CGPA"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>🔗 Links</legend>
        <div className="role">
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleInputChange}
            placeholder="GitHub URL"
          />
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="LinkedIn URL"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>🧠 Skills</legend>
        <textarea
          name="keySkills"
          value={formData.keySkills}
          onChange={handleInputChange}
          placeholder="Key Skills (comma-separated)"
        />
      </fieldset>

      <fieldset>
        <legend>💼 Experience</legend>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="Experience"
        />
      </fieldset>

      <fieldset>
        <legend>🚀 Projects</legend>
        <textarea
          name="projects"
          value={formData.projects}
          onChange={handleInputChange}
          placeholder="Projects"
        />
      </fieldset>

      <fieldset>
        <legend>📄 Uploads</legend>
        <div className="flex-row">
          <div className="role1">
            <label>Upload Resume (PDF):</label>
            <input type="file" accept=".pdf" onChange={handleResumeChange} />
          </div>
          <div className="role1">
            <label>Upload Profile Image (JPG/PNG):</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </div>
        </div>
      </fieldset>

      <button className="btn" type="submit">
        ✅ Submit Profile
      </button>
    </form>
  );
};

export default StudentProfileForm;
