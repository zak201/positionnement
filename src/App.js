import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TaskDashboard from './components/TaskDashboard';
import TaskList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]); // Démarre avec un tableau vide

    const toggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id)); // Supprime une tâche définitivement
    };

    const addTask = (taskText) => {
        const newTask = {
            id: Date.now(), // Utilise un timestamp comme ID unique
            task: taskText,
            completed: false,
        };
        setTasks([...tasks, newTask]); // Ajoute une nouvelle tâche
    };

    return (
        <Router>
            <Navigation />
            <div className="app-container">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <TaskDashboard
                                tasks={tasks}
                                toggleComplete={toggleComplete}
                                deleteTask={deleteTask}
                                addTask={addTask}
                            />
                        }
                    />
                    <Route
                        path="/tasks"
                        element={
                            <TaskList
                                tasks={tasks.filter(task => !task.completed)}
                                toggleComplete={toggleComplete}
                                deleteTask={deleteTask}
                            />
                        }
                    />
                    <Route
                        path="/completed-tasks"
                        element={
                            <CompletedTasks
                                tasks={tasks.filter(task => task.completed)}
                                deleteTask={deleteTask}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
