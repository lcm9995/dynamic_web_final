import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import HeaderBar from "./components/HeaderBar";
import LoginPage from "./pages/LoginPage";
import BulletinBoardPage from "./pages/BulletinBoardPage";
import ListsPage from "./pages/ListsPage";
import CalendarPage from "./pages/CalendarPage";
import UserContext from "./context/UserContext";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  //const [currentUser, setCurrentUser] = useState(null);
 // const {user, setUser} = useContext(UserContext);
  const {currentUser} = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [groceries, setGroceries] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/users").then((res) => {setUsers(res.data);});
    axios.get("http://localhost:3001/tasks").then((res) => setTasks(res.data));
    axios.get("http://localhost:3001/groceries").then((res) => setGroceries(res.data));
  }, []);

  return (
    <BrowserRouter>
      {currentUser && <HeaderBar />}

      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage users={users} />
          }
        />

        <Route
          path="/"
          element={
            currentUser? (
              <BulletinBoardPage
                tasks={tasks}
                groceries={groceries}
                users={users}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/lists"
          element={
            currentUser ? (<ListsPage tasks={tasks} setTasks={setTasks} groceries={groceries} setGroceries={setGroceries} users={users} />) 
            : (<Navigate to="/login" />)}
        />

        <Route
          path="/calendar"
          element={
            currentUser ? (
              <CalendarPage users={users} />
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
