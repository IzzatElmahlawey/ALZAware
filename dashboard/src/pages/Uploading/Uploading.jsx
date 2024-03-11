import React from "react";
import { useState } from "react";
import "./uploading.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
export default function Uploading() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  return (
    <main className="photo">
      <form
        className="upload-form"
        onClick={() => document.querySelector(".input-field").click()}
      >
        <input
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setImage(URL.createObjectURL(files[0]));
            }
          }}
          onClick={(e) => (e.target.value = null)}
        />
        {image ? (
          <img src={image} width={300} height={250} alt={fileName} />
        ) : (
          <>
            <CloudUploadIcon fontSize="large" />
            <p>Browse Files to upload</p>
          </>
        )}
      </form>
      <section className="uploaded">
        <ImageIcon color="black" />
        <span className="content">
          {fileName}
          <DeleteIcon
            onClick={() => {
              setFileName("No selected file");
              setImage(null);
            }}
          />
        </span>
      </section>
      <button className="detect">Detect Image</button>
    </main>
  );
}
