import React, { useState } from "react";
import axios from "axios";
import "./InsertAnimal.css";

const AnimalProfiles = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    scientific_name: "",
    native_habitat: "",
    diet: "",
    conservation_status: "",
    funfact: "",
  });

  const [files, setFiles] = useState({
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
    console.log("Selected file:", e.target.files[0]);
    console.log("Selected File:", files.image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("scientific_name", formData.scientific_name);
    data.append("native_habitat", formData.native_habitat);
    data.append("diet", formData.diet);
    data.append("conservation_status", formData.conservation_status);
    data.append("funfact", formData.funfact);

    if (files.image) {
      data.append("image", files.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/animalsdata/",data
      );
      console.log(response.data);
      console.log("FormData:", data);
      alert("✅ Animal added successfully!");
      setFormData({
        name: "",
        category: "",
        scientific_name: "",
        native_habitat: "",
        diet: "",
        conservation_status: "",
        funfact: "",
      });
      setFiles({ image: null });

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
          name="name"
          placeholder="Enter animal name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          placeholder="Enter animal category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label>Scientific Name:</label>
        <input
          type="text"
          name="scientific_name"
          placeholder="Enter scientific name"
          value={formData.scientific_name}
          onChange={handleChange}
          required
        />

        <label>Native Habitat:</label>
        <input
          type="text"
          name="native_habitat"
          placeholder="Enter native habitat"
          value={formData.native_habitat}
          onChange={handleChange}
          required
        />

        <label>Diet:</label>
        <input
          type="text"
          name="diet"
          placeholder="Enter diet"
          value={formData.diet}
          onChange={handleChange}
          required
        />

        <label>Conservation Status:</label>
        <input
          type="text"
          name="conservation_status"
          placeholder="Enter conservation status"
          value={formData.conservation_status}
          onChange={handleChange}
          required
        />

        <label>Fun Fact:</label>
        <textarea
          name="funfact"
          placeholder="Enter a fun fact"
          value={formData.funfact}
          onChange={handleChange}
        />

        <label>Upload Image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit">➕ Add Animal</button>
      </form>
    </div>
  );
};

export default AnimalProfiles;
