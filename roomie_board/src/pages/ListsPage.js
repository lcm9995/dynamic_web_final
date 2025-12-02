import "./ListsPage.css";
import TasksWidget from "../components/widgets/TasksWidget";
import GroceriesWidget from "../components/widgets/GroceryWidget";
export default function ListsPage(props) {
  const { tasks, setTasks, groceries, setGroceries, users} = props;
  
  return (
    <div className="lists-page-container">
      <h1 className="lists-page-title">Lists</h1>
      <div className="lists-page-section">
        <TasksWidget
          tasks={tasks}
          setTasks={setTasks}
          users={users}
        />
      </div>
      <div className="lists-page-section">
        <GroceriesWidget
          groceries={groceries}
          setGroceries={setGroceries}
          users={users}/>
      </div>
    </div>
  );
}