// components/DisplayArticles.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayArticle.css";

const DisplayArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/get-articles"
        );
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="articles-container">
      <h2>Articles 📚</h2>
      {articles.map((article, index) => (
        <div key={index} className="article-card">
          <h3>{article.title}</h3>
          <p>
            <strong>By:</strong> {article.author}
          </p>
          <p>{article.content}</p>
          <small>
            <em>{new Date(article.createdAt).toLocaleDateString()}</em>
          </small>
        </div>
      ))}
    </div>
  );
};

export default DisplayArticles;
