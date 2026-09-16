import React, { useState } from "react";
import axios from "axios";

export default function AddNewGuessAnimal() {
  const [name, setName] = useState("");
  const [options, setOptions] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return setMessage("Image is required!");
    }

    const optionsArray = options.split(",").map((opt) => opt.trim());
    const formData = new FormData();
    formData.append("name", name);
    formData.append("options", JSON.stringify(optionsArray)); // Send options as JSON string
    formData.append("image", image); // Append image file

    try {
      const res = await axios.post(
        "http://localhost:5000/api/guessgame",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message);
      setName("");
      setOptions("");
      setImage(null);
    } catch (error) {
      setMessage("Error saving the animal!");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add a New Guess Animal</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Animal name"
            required
          />
        </div>
        <div style={styles.inputContainer}>
          <label>Image: </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div style={styles.inputContainer}>
          <label>Options (comma-separated): </label>
          <input
            type="text"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder="Options"
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Add Animal
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    maxWidth: "500px",
    margin: "auto",
    borderRadius: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
  },
  inputContainer: {
    margin: "10px 0",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#87CEEB",
    border: "1px solid #aaa",
  },
  message: {
    marginTop: "20px",
    fontSize: "20px",
    color: "#333",
  },
};
