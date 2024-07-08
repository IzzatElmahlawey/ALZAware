import axios from "axios";
import styles from "./form.module.css";
import { useState } from "react";

const url = "http://127.0.0.1:5000/";
function Form({ setData }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(`${url}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
    } catch (error) {
      setData("Error uploading image");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button className={styles.button} onClick={handleUpload}>
        Detect
      </button>
    </div>
  );
}

export default Form;
