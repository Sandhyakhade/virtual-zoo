import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FetchAnimals.css"; // Import the CSS file

const FetchAnimals = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/animals");
        setAnimals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="animals-container">
      <h1 className="heading">Animals</h1>
      <div className="animals-grid">
        {animals.map((animal) => (
          <div className="animal-card" key={animal._id}>
            <h3>{animal.animal_name}</h3>
            <p>{animal.animal_description}</p>
            {animal.image_url && <img src={`http://localhost:5000${animal.image_url}`} alt={animal.animal_name} />}
            {animal.audio_url && <audio controls src={`http://localhost:5000${animal.audio_url}`} />}
            {animal.video_url && <video controls src={`http://localhost:5000${animal.video_url}`} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchAnimals;
