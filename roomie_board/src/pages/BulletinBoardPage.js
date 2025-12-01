import "./BulletinBoardPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

import TasksWidget from "../components/widgets/TasksWidget";
import GroceriesWidget from "../components/widgets/GroceryWidget";

export default function BulletinBoardPage(props) {
  const { currentUser, users } = props; //get current user 
  const [tasks, setTasks] = useState([]);
  const [groceries, setGroceries] = useState([]);


  /*useEffect(() => {
    axios.get("http://localhost:3001/tasks").then(res => setTasks(res.data));
    axios.get("http://localhost:3001/groceries").then(res => setGroceries(res.data));
  }, []);
*/
  /*function handleAddTask() {
    const title = prompt("New task:");
    if (!title) return;
    axios.post("http://localhost:3001/tasks", { title, complete: false })
      .then(res => setTasks([...tasks, res.data]));
  }*/

 /*function handleAddGrocery() {
    const title = prompt("New grocery item:");
    if (!title) return;
    axios.post("http://localhost:3001/groceries", { title, priority: "Low" })
      .then(res => setGroceries([...groceries, res.data]));
  }*/


  //const [tasks, setTasks] = useState([]);
  //const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/tasks").then((res) => setTasks(res.data));
    axios.get("http://localhost:3001/groceries").then((res) => setGroceries(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-column">
        <TasksWidget
          tasks={tasks}
          setTasks={setTasks}
          users = {users}
          currentUser={currentUser}
        />

        <GroceriesWidget
          groceries={groceries}
          setGroceries={setGroceries}
          users={users}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
