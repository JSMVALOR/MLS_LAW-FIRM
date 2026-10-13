import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import "../styles/Careers.css";
import { useTheme } from "./ThemeContext";

const Careers = () => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    residentialAddress: "",
    college: "",
    course: "",
    yearOfStudy: "",
    coverLetter: "",
    disputeType: "",
    cgpa: "",
    preferredMode: "",
  });

  const [cvFile, setCvFile] = useState(null);
  const [researchSample, setResearchSample] = useState(null);
  const [marksSheet, setMarksSheet] = useState(null);
  const [draftSample, setDraftSample] = useState(null);

  const [fileName, setFileName] = useState("No file chosen");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!cvFile) {
      toast.error("Please select a CV before submitting.");
      setMessage("Please select a CV before submitting.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("cv", cvFile);

    // Append extra files if they exist
    if (researchSample) data.append("researchSample", researchSample);
    if (marksSheet) data.append("marksSheet", marksSheet);
    if (draftSample) data.append("draftSample", draftSample);

    const request = axios.post(`${process.env.REACT_APP_API_URL}/career`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    try {
      const res = await toast.promise(request, {
        loading: "Submitting your application…",
        success: "Application submitted successfully!",
        error: "Submission failed — please try again.",
      });

      console.log(res.data);
      setMessage("Application submitted successfully!");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        residentialAddress: "",
        college: "",
        course: "",
        yearOfStudy: "",
        coverLetter: "",
        disputeType: "",
        cgpa: "",
        preferredMode: "",
      });
      setCvFile(null);
      setResearchSample(null);
      setMarksSheet(null);
      setDraftSample(null);
      setFileName("No file chosen");
    } catch (err) {
      console.error(err);
      setMessage("Error submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`internship-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="form-wrapper">
        <h1 className="form-title">Career Application</h1>
        <p className="form-subtitle">
          We are looking forward to have talented and motivated students and graduates join our team.
        </p>
        <form onSubmit={handleSubmit} className="application-form">
          {/* Personal Info */}
          <div className="form-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label>Mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
              <div className="form-group">
                <label>Residential Address</label>
                <input
                  type="text"
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="form-section">
            <h2 className="section-title">Educational Qualifications</h2>
            <div className="form-row">
              <div className="form-group">
                <label>College/University</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college or university name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Course</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="Enter your course name"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Year of Study</label>
                <input
                  type="text"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  placeholder="e.g. 1 or 2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Nature of Application */}
          <div className="form-section">
            <h2 className="section-title">Nature of Application</h2>
            <div className="form-field">
              <label htmlFor="disputeType">Applying for</label>
              <select
                id="disputeType"
                name="disputeType"
                value={formData.disputeType}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select type
                </option>
                <option value="Internship-short">Short Internship</option>
                <option value="Internship-long">Long Internship</option>
                <option value="Research-Internship">Research Internship</option>
                <option value="Assessment Internship">Assessment Internship</option>
                <option value="Associate openings">Associate openings</option>
              </select>
            </div>

            {/* Mode of Internship */}
            <div className="form-field">
              <label htmlFor="preferredMode">Preferred Mode</label>
              <select
                id="preferredMode"
                name="preferredMode"
                value={formData.preferredMode}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select mode
                </option>
                <option value="Offline Mode">Offline Mode</option>
                <option value="Online Mode">Online Mode</option>
                <option value="Hybrid Mode">Hybrid Mode</option>
              </select>
            </div>

            {/* Conditional Fields */}
            {formData.disputeType === "Assessment Internship" && (
              <>
                <p style={{ color: "red" }}>Only applicable to final year students</p>
                <div className="form-group">
                  <label>CGPA</label>
                  <input
                    type="text"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    placeholder="Enter your CGPA"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Research Sample</label>
                  <input
                    type="file"
                    onChange={(e) => setResearchSample(e.target.files[0])}
                    required
                  />
                </div>
              </>
            )}

            {formData.disputeType === "Associate openings" && (
              <>
                <div className="form-group">
                  <label>Marks Sheet Upload</label>
                  <input
                    type="file"
                    onChange={(e) => setMarksSheet(e.target.files[0])}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Draft Sample</label>
                  <input
                    type="file"
                    onChange={(e) => setDraftSample(e.target.files[0])}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Research Sample</label>
                  <input
                    type="file"
                    onChange={(e) => setResearchSample(e.target.files[0])}
                    required
                  />
                </div>
              </>
            )}
          </div>

          {/* Documents */}
          <div className="form-section">
            <h2 className="section-title">Documents</h2>
            <div className="form-group file-input-wrapper">
              <label className="file-input-label">
                {fileName === "No file chosen" ? "Upload CV / Resume" : "Change File"}
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
              </label>
              <span className="file-name">{fileName}</span>
            </div>
            <div className="form-group cover-letter">
              <label>Cover Letter (Required)</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Write your cover letter here..."
                rows="6"
                enterKeyHint="send"
              />
            </div>
          </div>

          {message && (
            <div className={`message ${message.includes("success") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>

      {/* Back button */}
      <div className="back-button-container">
        <button type="button" className="back-btn" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Careers;
