import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GuessGameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [disableOptions, setDisableOptions] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/guessgame");
        setGames(res.data);
      } catch (error) {
        console.error("Error fetching guess games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleGuess = (option) => {
    if (disableOptions) return;

    const currentAnimal = games[currentIndex];
    const isCorrect = option === currentAnimal.name;

    setFeedback(
      isCorrect ? "✅ Correct!" : `❌ Wrong! It was "${currentAnimal.name}"`
    );
    setDisableOptions(true);

    // Show next animal after delay
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % games.length);
      setFeedback("");
      setDisableOptions(false);
    }, 1500);
  };

  if (loading) return <p>Loading games...</p>;
  if (games.length === 0) return <p>No animals found in the game!</p>;

  const currentAnimal = games[currentIndex];

  return (
    <div style={styles.container}>
      <h2>Guess the Animal</h2>
      <img
        src={`http://localhost:5000${currentAnimal.imageUrl}`}
        alt="animal"
        style={styles.image}
      />
      <div style={styles.options}>
        {currentAnimal.options.map((option, index) => (
         
          <button
            key={index}
            onClick={() => handleGuess(option)}
            disabled={disableOptions}
            style={{
              ...styles.optionButton,
              backgroundColor:
                disableOptions && option === currentAnimal.name
                  ? "#90EE90" // light green for correct
                  : "orange",
              cursor: disableOptions ? "not-allowed" : "pointer",
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && <p style={styles.feedback}>{feedback}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    maxWidth: "600px",
    margin: "auto",
    
    borderRadius: "10px",
    backgroundColor: "",
  },
  image: {
    width: "300px",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  options: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    
  },
  optionButton: {
    padding: "14px 28px",
    fontSize: "18px",
    border: "none",
    borderRadius: "12px",
    margin: "8px",
    boxShadow: "0 4px 6px rgba(0, 3, 0, 0.1)",
    fontWeight: "bold",
  },
  feedback: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
};
