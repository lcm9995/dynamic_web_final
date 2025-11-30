import "./TasksWidget.css";
import ListWidget from "./ListWidget";
import TaskItem from "./TaskItem";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";


export default function TasksWidget(props) {
    const { tasks, setTasks, currentUser } = props;

  function handleAddTask(formData) {
    const newTask = {
      title: formData.title,
      complete: false,
      creatorId: currentUser ? currentUser.id : null,
      completedById: null,
      recurring: formData.recurring,
      frequency: formData.frequency,
      daysOfWeek: formData.daysOfWeek
    };

    axios
      .post("http://localhost:3001/tasks", newTask)
      .then((res) => {
        setTasks([...tasks, res.data]);
      });
  }

  function handleToggleComplete(taskId, checked) {
    const existing = tasks.find((t) => t.id === taskId);
    if (!existing) return;

    const updated = {
      ...existing,
      complete: checked,
      completedById: checked
        ? currentUser
          ? currentUser.id
          : null
        : null
    };

    axios
      .patch(`http://localhost:3001/tasks/${taskId}`, updated)
      .then((res) => {
        setTasks(tasks.map((t) => (t.id === taskId ? res.data : t)));
      });
  }


  return (
    <ListWidget
      title="Tasks"
      items={tasks}
      AddForm={AddTaskForm}
      onAddItem={handleAddTask}
      renderItem={(task) => (
        <TaskItem
          task={task}
          onToggleComplete={(checked) => handleToggleComplete(task.id, checked)}
        />
      )}
    />
  );
}
