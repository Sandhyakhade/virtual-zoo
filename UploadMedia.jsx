import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, storage } from "../firebase"; // ✅ Ensure correct import
import { push, ref as dbRef } from "firebase/database"; // ✅ Import push an ref 


const UploadMedia = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setUploading(true);
    const fileRef = ref(storage, `media/${file.name}`);

    try {
      // Upload file to Firebase Storage
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);

      // Save URL to Firebase Realtime Database
      await push(dbRef(database, "media"), { url: fileURL, type: file.type });

      alert("Upload successful!");
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    }

    setUploading(false);
  };

  return (
    <div>
      <h2>Upload Media</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadMedia;
