import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { getTasks, addTask as apiAddTask, deleteTask as apiDeleteTask, updateTask as apiUpdateTask } from '../services/api';

function TaskDashboard({ onLogout }) {
    const [tasks, setTasks] = useState([]);

    // Fonction pour récupérer les tâches
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const tasksData = await getTasks();
            setTasks(tasksData);
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches:', error);
        }
    };

    // Ajouter une tâche
    const addTask = async (taskText) => {
        try {
            await apiAddTask({ title: taskText, description: '' });
            fetchTasks(); // Met à jour la liste des tâches après l'ajout
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la tâche:', error);
        }
    };

    // Supprimer une tâche
    const deleteTask = async (id) => {
        try {
            await apiDeleteTask(id);
            fetchTasks(); // Met à jour la liste des tâches
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche:', error);
        }
    };

    // Mettre à jour une tâche
    const updateTask = async (id, newText) => {
        try {
            await apiUpdateTask(id, { title: newText });
            fetchTasks(); // Met à jour la liste des tâches après la modification
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche:', error);
        }
    };
    // Bascule l'état de complétion d'une tâche
    const toggleComplete = async (id, completed) => {
        try {
            await apiUpdateTask(id, { completed });
            fetchTasks(); // Met à jour la liste des tâches après la modification
        } catch (error) {
            console.error("Erreur lors du changement de l'état de complétion de la tâche:", error);
        }
    };

    return (
        <div>
            <button onClick={() => {
                localStorage.removeItem('token');
                onLogout();
            }}>Déconnexion</button>
            <h1>Ajouter une tâche</h1>
            <TaskForm addTask={addTask} />
            <h2>Liste des tâches</h2>
            <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                updateTask={updateTask}
                toggleComplete={toggleComplete}
            />
        </div>
    );
}

export default TaskDashboard;
