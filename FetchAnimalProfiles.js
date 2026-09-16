/*import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AnimalProfiles.css";

const FetchAnimalProfiles = () => {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  // Fetch animals data
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/animalsdata/getAllAnimals"
          
        
        );
        console.log(response.data);
        setAnimals(response.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, []);

  // Handle profile click
  const handleProfileClick = (animal) => {
    setSelectedAnimal(animal);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedAnimal(null);
  };

  return (
    <div className="animal-profiles-container">
      <h2>Animal Profiles 🐾</h2>
      <div className="animal-list">
        {animals.map((animal) => (
          <div
            key={animal._id}
            className="animal-card"
            onClick={() => handleProfileClick(animal)}
          >
            <div className="animal-card-image">
              <img
                src={animal.image_url || "/uploads/placeholder.png"}
                alt={animal.name || "Unknown Animal"}
                className="animal-image"
              />
            </div>
            <div className="animal-card-details">
              <h3>{animal.name || "Unknown Name"}</h3>
              <p>{animal.category || "Unknown Category"}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedAnimal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="animal-name">
                {selectedAnimal.name || "Unknown Name"}
              </h2>
              <p className="scientific-name">
                {selectedAnimal.scientific_name || "Unknown Scientific Name"}
              </p>
              <button className="close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-image-wrapper">
              <img
                src={selectedAnimal.image_url || "/uploads/placeholder.png"}
                alt={selectedAnimal.name || "Unknown Animal"}
                className="animal-image"
              />
            </div>
            <div className="modal-details">
              <div className="key-details">
                <p>
                  <strong>Native Habitat:</strong>{" "}
                  {selectedAnimal.native_habitat || "Unknown Habitat"}
                </p>
                <p>
                  <strong>Diet:</strong> {selectedAnimal.diet || "Unknown Diet"}
                </p>
                <p>
                  <strong>Conservation Status:</strong>{" "}
                  {selectedAnimal.conservation_status || "Unknown Status"}
                </p>
              </div>
              <div className="fun-fact">
                <p>
                  <strong>Fun Fact:</strong>{" "}
                  {selectedAnimal.funfact || "No Fun Fact Available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchAnimalProfiles;
*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AnimalProfiles.css";

const FetchAnimalProfiles = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/animalsdata/getAllAnimals"
        );
        setAnimals(response.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div className="animal-profiles-container">
      <h2>Animal Profiles 🐾</h2>
      <div className="animal-list">
        {animals.map((animal) => (
          <div key={animal._id} className="animal-card-horizontal">
            <div className="animal-card-image">
              <img
                src={
                  animal.image_url
                    ? `http://localhost:5000${animal.image_url}`
                    : "/uploads/placeholder.png"
                }
                alt={animal.name || "Animal"}
                className="animal-image"
              />
            </div>
            <div className="animal-card-info">
              <h3>{animal.name || "Unknown Name"}</h3>
              <p className="category">
                📚 {animal.category || "Unknown Category"}
              </p>
              <p>
                🥗 <strong>Diet:</strong> {animal.diet || "Unknown"}
              </p>
              <p>
                🌍 <strong>Habitat:</strong>{" "}
                {animal.native_habitat || "Unknown"}
              </p>
              <p>
                🛡️ <strong>Status:</strong>{" "}
                {animal.conservation_status || "Unknown"}
              </p>
              <p className="fun-fact">
                🎉 <strong>Fun Fact:</strong>{" "}
                {animal.funfact || "No fun fact available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchAnimalProfiles;
