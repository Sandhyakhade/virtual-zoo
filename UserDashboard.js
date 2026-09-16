import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";
import FetchAnimals from "./FetchAnimals";
import InsertAnimals from "./InsertAnimals";
import AnimalProfiles from "./AnimalProfiles";
import FetchAnimalProfiles from "./FetchAnimalProfiles";
import AddNewGuessAnimal from "./AddNewGuessAnimal";
import AddQuiz from "./AddQuizz";
import WriteArticle from "./WriteArticle";
import DisplayArticle from "./DisplayArticle";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("Guest");
  const [username, setUserName] = useState("Guest");

  useEffect(() => {
    const emailFromLocation = location.state ? location.state.email : null;
    const emailFromStorage = localStorage.getItem("email");
    const usernameFromStorage = localStorage.getItem("username");

    if (emailFromLocation) {
      setEmail(emailFromLocation);
    } else if (emailFromStorage) {
      setEmail(emailFromStorage);
    } else if (usernameFromStorage) {
      setUserName(usernameFromStorage);
    }

    console.log("Email in Dashboard:", email); // Debugging
  }, [location.state]); // Only dependency should be location.state

  // Only run when location.state changes

  const [activeView, setActiveView] = useState("none");

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  const renderContent = () => {
    switch (activeView) {
      case "insert":
        return <WriteArticle />;
      case "view":
        return <DisplayArticle/>;
      case "see":
        return <FetchAnimalProfiles />;
      case "guess":
        return <AddNewGuessAnimal />;
      case "quizz":
        return <AddQuiz />;
      default:
        return <p>Select an option from the left panel.</p>;
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar Panel */}
      <aside className="dashboard-sidebar">
        <div className="profile-section">
          <h2>Welcome, User</h2> {/* Display email as the username */}
          <p className="user-profile">👤 Username: {email}</p>{" "}
          {/* Dynamic username */}
        </div>
        <div className="sidebar-buttons">
          <button onClick={() => setActiveView("insert")}>
            ➕ Write Article
          </button>
          <button onClick={() => setActiveView("view")}>👀 Display Article</button>
          <button onClick={() => setActiveView("see")}>
            👀 View Animal Profiles
          </button>
          
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content Panel */}
      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
