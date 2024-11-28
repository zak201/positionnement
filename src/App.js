import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import TaskDashboard from './components/TaskDashboard';
import TaskList from './components/TaskList';
import CompletedTasks from './components/CompletedTasks';
import LoginForm from './components/LoginForm';
import './App.css'; // Import des styles

function App() {
    // Gestion de l'authentification
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <div className="app-container">
                {isAuthenticated ? (
                    <>
                        <Navigation /> {/* Barre de navigation */}
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <TaskDashboard onLogout={() => setIsAuthenticated(false)} />
                                }
                            />
                            <Route
                                path="/tasks"
                                element={
                                    <TaskList />
                                }
                            />
                            <Route
                                path="/completed-tasks"
                                element={
                                    <CompletedTasks />
                                }
                            />
                        </Routes>
                    </>
                ) : (
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                )}
            </div>
        </Router>
    );
}

export default App;
