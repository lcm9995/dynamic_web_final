import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderBar from "./components/HeaderBar";
import LoginPage from "./pages/LoginPage";
import BulletinBoardPage from "./pages/BulletinBoardPage";
import ListsPage from "./pages/ListsPage";
import CalendarPage from "./pages/CalendarPage";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [groceries, setGroceries] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <BrowserRouter>
      {currentUser && <HeaderBar currentUser={currentUser} />}

      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage users={users} onSelectUser={setCurrentUser} />
          }
        />

        <Route
          path="/"
          element={
            currentUser ? (
              <BulletinBoardPage currentUser={currentUser} users={users} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/lists"
          element={
            currentUser ? (<ListsPage tasks={tasks} setTasks={setTasks} groceries={groceries} setGroceries={setGroceries} users={users} currentUser={currentUser} />) 
            : (<Navigate to="/login" />)}
        />

        <Route
          path="/calendar"
          element={
            currentUser ? (
              <CalendarPage currentUser={currentUser} users={users} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
