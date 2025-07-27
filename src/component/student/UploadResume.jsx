import React, { useState } from "react";
import "./UploadResume.css";

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      // Upload logic here (e.g., using Axios to send file to backend)
      console.log("Resume uploaded:", selectedFile.name);
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="upload-container">
      <h2>📤 Upload Your Resume</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <label htmlFor="resume">Select Resume (PDF/DOC):</label>
        <input
          type="file"
          id="resume"
          accept=".pdf, .doc, .docx"
          onChange={handleFileChange}
        />
        {selectedFile && <p className="file-name">📎 {selectedFile.name}</p>}
        <button className="btn" type="submit">
          Upload Resume
        </button>
      </form>
    </div>
  );
};

export default UploadResume;
