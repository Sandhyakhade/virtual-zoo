// components/WriteArticle.js
import React, { useState } from "react";
import axios from "axios";
import "./WriteArticles.css";

const WriteArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/add-article", {
        title,
        content,
        author,
      });
      alert("Article submitted successfully!");
      setTitle("");
      setContent("");
      setAuthor("");
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="write-article-form">
      <h2>Write a New Article 📝</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <button type="submit">Submit Article ✅</button>
    </form>
  );
};

export default WriteArticle;
