import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

export default function LoginPage({users}) {
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(UserContext);
  function handleLogin(user) {
    setCurrentUser(user);
    navigate("/");
  }
  return (
    <div className="login-container">
      <h1 className="login-title">Roommate Login</h1>
      <p className="login-subtitle">Choose your roommate profile:</p>

      <div className="login-buttons">
        {users.map((u) => (
          <button
            key={u.id}
            className="login-btn"
            onClick={() => handleLogin(u)}
            style={{ backgroundColor: u.color }}
          >
            {u.name}
          </button>
        ))}
      </div>
    </div>
  );
}

