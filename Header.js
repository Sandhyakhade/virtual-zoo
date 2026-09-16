import { Link } from "react-router-dom";
function Header() {
  return (
    <header
      style={{ backgroundColor: "#4CAF50", padding: "10px", color: "white" }}
    >
      <h1>Virtual Zoo</h1>
      <nav>
        <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
          <li style={{ margin: "0 10px" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
          </li>{" "}
          <li style={{ margin: "0 10px" }}>
            <Link
              to="/animals"
              style={{ color: "white", textDecoration: "none" }}
            >
              Animals
            </Link>
          </li>
          <li style={{ margin: "0 10px" }}>
            <Link
              to="/FetchAnimalProfiles"
              style={{ color: "white", textDecoration: "none" }}
            >
              AnimalProfiles
            </Link>
          </li>
          <li style={{ margin: "0 10px" }}>
            <Link
              to="/GuessTheAnimal"
              style={{ color: "white", textDecoration: "none" }}
            >
              GuessGame
            </Link>
          </li>
          <li style={{ margin: "0 10px" }}>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
          </li>{" "}
          <li style={{ margin: "0 10px" }}>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              Register
            </Link>
          </li>
          <li style={{ margin: "0 10px" }}>
            <Link
              to="/AdminLogin"
              style={{ color: "white", textDecoration: "none" }}
            >
              AdminLogin
            </Link>
          </li>
          <li style={{ margin: "0 10px" }}>
            <Link
              to="/QuizzDisplay"
              style={{ color: "white", textDecoration: "none" }}
            >
              QuizzDsiplay
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;