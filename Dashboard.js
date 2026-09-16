/*import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";
import FetchAnimals from "./FetchAnimals";
import InsertAnimals from "./InsertAnimals";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromLocation = location.state ? location.state.email : null;
  const email = emailFromLocation || localStorage.getItem("email") || "Guest";
  const [activeView, setActiveView] = useState("none");

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeView) {
      case "insert":
        return <InsertAnimals />;
      case "view":
        return <FetchAnimals />;
      default:
        return <p>Select an option from the left panel.</p>;
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar Panel *//*}
      <aside className="dashboard-sidebar">
        <div className="profile-section">
          <h2>Welcome, User</h2>
          <p className="user-profile">👤 Username: {email}</p>
        </div>
        <div className="sidebar-buttons">
          <button onClick={() => setActiveView("insert")}>
            ➕ Insert Animal
          </button>
          <button onClick={() => setActiveView("view")}>👀 View Animals</button>
          <button onClick={() => alert("Settings coming soon")}>
            ⚙️ Settings
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content Panel *//*}
      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
*/
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";
import FetchAnimals from "./FetchAnimals";
import InsertAnimals from "./InsertAnimals";
import AnimalProfiles from "./AnimalProfiles";
import FetchAnimalProfiles from "./FetchAnimalProfiles";
import AddNewGuessAnimal from "./AddNewGuessAnimal";
import AddQuiz from "./AddQuizz";

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
    }
    else if (usernameFromStorage) {
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
        return <InsertAnimals />;
      case "view":
        return <FetchAnimals />;
      case "create":
        return <AnimalProfiles />;
      case "see":
        return <FetchAnimalProfiles />;
      case "guess":
        return <AddNewGuessAnimal />;
      case "quizz":
        return<AddQuiz/>
      default:
        return <p>Select an option from the left panel.</p>;
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar Panel */}
      <aside className="dashboard-sidebar">
        <div className="profile-section">
          <h2>Welcome, Admin</h2> {/* Display email as the username */}
          <p className="user-profile">👤 Username: {email}</p>{" "}
          {/* Dynamic username */}
        </div>
        <div className="sidebar-buttons">
          <button onClick={() => setActiveView("insert")}>
            ➕ Insert Animal
          </button>
          <button onClick={() => setActiveView("view")}>👀 View Animals</button>
          <button onClick={() => setActiveView("create")}>
            🛠️ Create Animal Profiles
          </button>
          <button onClick={() => setActiveView("see")}>
            👀 View Animal Profiles
          </button>
          <button onClick={() => setActiveView("guess")}>
            👀 Add NewGuessAnimal
          </button>
          <button onClick={() => setActiveView("quizz")}>
            👀 Add Quizz
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
