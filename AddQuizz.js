import React, { useState } from "react";
import axios from "axios";
import "./AddQuizz.css"; // Add styling for a kid-friendly look

const AddQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleAddQuiz = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/add-quiz", {
        question,
        options,
        correctAnswer,
      });
      alert("Hooray! Quiz added 🎉");
    } catch (error) {
      alert("Oops! Something went wrong 😢");
    }
  };

  return (
    <div className="add-quiz-container">
      <h2>Add a New Quiz 🐾</h2>
      <form onSubmit={handleAddQuiz}>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="quiz-input"
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) =>
              setOptions(
                options.map((opt, idx) =>
                  idx === index ? e.target.value : opt
                )
              )
            }
            className="quiz-input"
          />
        ))}
        <input
          type="text"
          placeholder="Enter the correct answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="quiz-input"
        />
        <button type="submit" className="submit-button">
          Add Quiz 🚀
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
