import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TaskDashboard from './components/TaskDashboard';
import TaskList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks';
import './App.css'; // Import des styles

function App() {
    const [tasks, setTasks] = useState([]); // Initialisation des tâches
    const [ setIsAuthenticated] = useState(localStorage.getItem('token') !== null);


    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };
    const toggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id)); // Suppression d'une tâche
    };

    const addTask = (taskText) => {
        const newTask = {
            id: Date.now(), // Génère un ID unique
            task: taskText,
            completed: false,
        };
        setTasks([...tasks, newTask]); // Ajout d'une tâche
    };

    return (
        <Router>
            <div className="app-container">
                <Navigation onLogout={handleLogout}/> {/* Barre de navigation */}
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
