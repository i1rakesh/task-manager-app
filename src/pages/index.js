import { useState, useEffect } from 'react';
import Task from '../components/Task';

export default function Home({ initialTasks }) {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks from localStorage if available, otherwise use initial tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Add taskId to each initial task
      setTasks(initialTasks.map(task => ({ ...task, taskId: Date.now() + Math.random() })));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Function to add a new task (with unique taskId)
  const addTask = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const priority = e.target.priority.value;
    const newTask = { title, description, priority, completed: false, taskId: Date.now() + Math.random() };

    setTasks([...tasks, newTask]);
    e.target.reset();
  };

  // Function to delete a task using taskId
  const deleteTask = (taskId) => {
    const newTasks = tasks.filter(task => task.taskId !== taskId);
    setTasks(newTasks);
  };

  // Function to toggle task completion using taskId
  const toggleCompletion = (taskId) => {
    const newTasks = tasks.map(task =>
      task.taskId === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  // Function to edit a task using taskId
  const editTask = (taskId, updatedTask) => {
    const newTasks = tasks.map(task => 
      task.taskId === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(newTasks);
  };

  // Filter tasks by search term (by title or description)
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort tasks by priority (high -> medium -> low)
  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorities = { high: 1, medium: 2, low: 3 };
    return priorities[a.priority] - priorities[b.priority];
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Task form */}
      <form onSubmit={addTask}>
        <input type="text" name="title" placeholder="Title" required />
        <input type="text" name="description" placeholder="Description" required />
        <select name="priority" required>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Render tasks */}
      <div className="task-list">
        {sortedTasks.map((task) => (
          <Task
            key={task.taskId}
            task={task}
            onDelete={() => deleteTask(task.taskId)}
            onToggle={() => toggleCompletion(task.taskId)}
            onEdit={(updatedTask) => editTask(task.taskId, updatedTask)}
          />
        ))}
      </div>
    </div>
  );
}

// Fetch initial tasks on server-side
export async function getServerSideProps() {
  const initialTasks = [
    {
        "title": "Daily Task",
        "description": "Task Description ",
        "priority": "high",
        "completed": false,
        "taskId": 1729328098215.686
    },
    {
        "title": "Prio Task",
        "description": "Description 001",
        "priority": "low",
        "completed": false,
        "taskId": 1729328122098.3154
    },
    {
        "title": "Important Task",
        "description": "Task Merge data",
        "priority": "low",
        "completed": false,
        "taskId": 1729328165373.6167
    }
];

  return { props: { initialTasks } };
}
