import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuizzDisplay.css"; // Add styling for a fun, kid-friendly look

const QuizDisplay = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/get-quiz");
        setQuizzes(data);
      } catch (error) {
        alert("Error fetching quizzes");
      }
    };
    fetchQuizzes();
  }, []);

  const handleAnswer = (answer) => {
    if (answer === quizzes[currentIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < quizzes.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsQuizComplete(true); // Display scorecard
    }
  };

  if (isQuizComplete) {
    return (
      <div className="scorecard-container">
        <h2>Quiz Complete! 🎉</h2>
        <p>
          Great job! You scored {score} out of {quizzes.length}!
        </p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Play Again 🦄
        </button>
      </div>
    );
  }

  return quizzes.length ? (
    <div className="quiz-container">
      <h3>{quizzes[currentIndex].question}</h3>
      {quizzes[currentIndex].options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
          className="option-button"
        >
          {option}
        </button>
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default QuizDisplay;
