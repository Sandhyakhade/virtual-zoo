
import React, { useState } from "react";
import axios from "axios";
import "./InsertAnimal.css";

const InsertAnimal = () => {
  const [formData, setFormData] = useState({
    animal_name: "",
    animal_description: "",
  });

  const [files, setFiles] = useState({
    image: null,
    audio: null,
    video: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("animal_name", formData.animal_name);
    data.append("animal_description", formData.animal_description);
    if (files.image) data.append("image", files.image);
    if (files.audio) data.append("audio", files.audio);
    if (files.video) data.append("video", files.video);
    

    try {
      const response = await axios.post(
        "http://localhost:5000/api/animals",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("✅ Animal added successfully!");
      // Reset form
      setFormData({ animal_name: "", animal_description: "" });
      setFiles({ image: null, audio: null, video: null });
    } catch (error) {
      console.error(error);
      alert("❌ Error adding animal.");
    }
  };

  return (
    <div className="insert-animal-container">
      <h2>Add a New Animal 🐾</h2>
      <form onSubmit={handleSubmit} className="animal-form">
        <label>Animal Name:</label>
        <input
          type="text"
          name="animal_name"
          placeholder="Enter animal name"
          value={formData.animal_name}
          onChange={handleChange}
          required
        />

        <label>Animal Description:</label>
        <textarea
          name="animal_description"
          placeholder="Enter a short description"
          value={formData.animal_description}
          onChange={handleChange}
          required
        />

        <label>Upload Image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />

        <label>Upload Audio:</label>
        <input
          type="file"
          name="audio"
          accept="audio/*"
          onChange={handleFileChange}
        />

        <label>Upload Video:</label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleFileChange}
        />

        <button type="submit">➕ Add Animal</button>
      </form>
    </div>
  );
};

export default InsertAnimal;

