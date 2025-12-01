import "./TasksWidget.css";
import ListWidget from "./ListWidget";
import TaskItem from "./TaskItem";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";


export default function TasksWidget(props) {
  const { tasks, setTasks, users, currentUser } = props;
  //only show tasks that are marked as "current"
  const visibleTasks = tasks.filter((t) => t.isCurrent !== false);
  
  function handleAddTask(formData) {
    const newTask = {
      title: formData.title,
      complete: false,
      creatorId: currentUser ? currentUser.id : null,
      completedById: null,
      recurring: formData.recurring,
      frequency: formData.frequency,
      daysOfWeek: formData.daysOfWeek,
      isCurrent: true
    };
    axios.post("http://localhost:3001/tasks", newTask).then((res) => {setTasks([...tasks, res.data]);});
  } 

  function handleToggleComplete(taskId, checked) {
    //get task object
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    //if checking the box, update completedById to the current User
    //if unchecking the box, update completedById to null
    const updated = {
      ...task,
      complete: checked,
      completedById: checked ? currentUser.id : null
    };
    axios.patch(`http://localhost:3001/tasks/${taskId}`, updated).then((res) => 
      {setTasks(tasks.map((t) => (t.id === taskId ? res.data : t)));
      }
    );
  }
  //
  function handleDeleteTask(task) {
    //if its a reccuring task, we keep it in the db but hide it from the view
    if (task.recurring) {
      //hide recurring task from lists view by setting isCurrent false
      const updated = { ...task, isCurrent: false };
      axios.patch(`http://localhost:3001/tasks/${task.id}`, updated).then((res) => 
        {setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
        }
      );
    } else {
      //if not a recurring task, it can be removed from the db 
      axios.delete(`http://localhost:3001/tasks/${task.id}`).then(() => 
        {setTasks(tasks.filter((t) => t.id !== task.id));
        }
      );
    }
  }

  function findUser(id) {
    return users.find((u) => u.id === id) || null;
  }

  return (
    <ListWidget
      title="Tasks"
      headers={["Status", "Title", "Creator", "Done By", "Recurring"]}
      items={visibleTasks}
      AddForm={AddTaskForm}
      onAddItem={handleAddTask}
      renderItem={(task) => (
        <TaskItem
          task={task}
          creator={findUser(task.creatorId)}
          completer={findUser(task.completedById)}
          onToggleComplete={(checked) =>
            handleToggleComplete(task.id, checked)
          }
          onDelete={() => handleDeleteTask(task)}
        />
      )}
    />
  );
}
