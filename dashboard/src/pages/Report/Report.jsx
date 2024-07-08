import "./report.css";
import React, { useState } from "react";

function Report() {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({ reason: "", description: "" });

  const validateForm = () => {
    let isValid = true;
    let error = { reason: "", description: "" };

    if (!reason.trim()) {
      error.reason = "Reason is required";
      isValid = false;
    }

    if (!description.trim()) {
      error.description = "Description is required";
      isValid = false;
    }

    setError(error);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Handle form submission
    }
  };

  return (
    <div className="Sub-Main">
      <div>
        <label className="Label">Reason</label>
        <div>
          <textarea
            type="text"
            className="Name"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          {error.reason && <p className="valid">{error.reason}</p>}
        </div>

        <label className="Label">Description</label>
        <div>
          <textarea
            type="text"
            className="Name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error.description && <p className="valid">{error.description}</p>}
        </div>
        <div className="Download">
          <button className="Button" onClick={handleSubmit}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default Report;
