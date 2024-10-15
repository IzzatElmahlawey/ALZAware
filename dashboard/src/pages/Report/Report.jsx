import "./report.css";
import React, { useState } from "react";
import * as yup from "yup";

// Define the Yup validation schema
const validationSchema = yup.object().shape({
  reason: yup.string().required("Reason is required").trim(),
  description: yup.string().required("Description is required").trim(),
});

function Report() {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({ reason: "", description: "" });

  const validateForm = async () => {
    try {
      await validationSchema.validate(
        { reason, description },
        { abortEarly: false }
      );
      setError({ reason: "", description: "" }); // Clear errors if validation passes
      return true;
    } catch (validationErrors) {
      const formErrors = { reason: "", description: "" };
      validationErrors.inner.forEach((error) => {
        formErrors[error.path] = error.message;
      });
      setError(formErrors);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      // Handle form submission (e.g., download logic)
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
