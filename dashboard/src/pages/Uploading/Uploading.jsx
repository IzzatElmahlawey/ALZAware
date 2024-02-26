import React from "react";
import { useState } from "react";
import "./uploading.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
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
            <MdCloudUpload color="rebeccapurple" size={60} />
            <p>Browse Files to upload</p>
          </>
        )}
      </form>
      <section className="uploaded">
        <AiFillFileImage color="black" />
        <span className="content">
          {fileName}
          <MdDelete
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
