import "./FormCard.scss";
import { useState } from "react";
import {
  HiOutlineBriefcase,
  HiOutlineCloudArrowUp,
  HiOutlineUser,
} from "react-icons/hi2";
import { FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../../hooks/useInterview";


export default function FormCard() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const navigate = useNavigate();

  const { generateReport, loading } = useInterview();

  const handleAnalyze = async () => {
  if (!jobDescription.trim()) {
    alert("Please enter the job description.");
    return;
  }

  if (!resumeFile && !selfDescription.trim()) {
    alert("Upload a resume or enter a self description.");
    return;
  }

  try {
    const report = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    if (report?._id) {
      navigate(`/interview/${report._id}`);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to generate interview report.");
  }
};

  return (
    <div className="form-card">

      {/* LEFT SIDE */}

      <div className="left">

        <div className="title">

          <div className="heading">

            <HiOutlineBriefcase />

            <h3>Target Job Description</h3>

          </div>

          <span className="badge required">Required</span>

        </div>

        <textarea
          placeholder="Paste the complete job description here..."
          maxLength={5000}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <p className="counter">
          {jobDescription.length} / 5000
        </p>

      </div>

      {/* RIGHT SIDE */}

      <div className="right">

        <div className="title">

          <div className="heading">

            <HiOutlineUser />

            <h3>Your Profile</h3>

          </div>

        </div>

        {/* Upload */}

        <label className="label">
          Upload Resume
          <span className="badge">Best Results</span>
        </label>

        <label className="upload-box">

          <HiOutlineCloudArrowUp className="upload-icon" />

          <h4>
            {fileName || "Click to Upload"}
          </h4>

          <p>PDF, DOC, DOCX • Max 5MB</p>

          <input
            type="file"
            hidden
            onChange={(e) => {
              if (e.target.files.length) {
                setResumeFile(e.target.files[0]);
                setFileName(e.target.files[0].name);
              }
            }}
          />

        </label>

        <div className="divider">

          <span>OR</span>

        </div>

        <label className="label">
          Self Description
        </label>

        <textarea
          placeholder="Briefly introduce yourself..."
          maxLength={1000}
          value={selfDescription}
          onChange={(e) => setSelfDescription(e.target.value)}
        />

        <p className="counter">
          {selfDescription.length} / 1000
        </p>

        <div className="info-box">

          <FiInfo />

          <span>
            Resume or self description is required for AI analysis.
          </span>

        </div>

      </div>

      {/* FOOTER */}

      <div className="footer">

        <div>

          <h4>AI Resume Analysis</h4>

          <p>Estimated time: 20 seconds</p>

        </div>

        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

      </div>

    </div>
  );
}