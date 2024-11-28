import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { getTasks, addTask as apiAddTask, deleteTask as apiDeleteTask, updateTask as apiUpdateTask } from '../services/api';

function TaskDashboard() {
    const [tasks, setTasks] = useState([]);

    // Récupérer les tâches au chargement du composant
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await getTasks();
                setTasks(tasksData);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches:', error);
            }
        };
        fetchTasks();
    }, []);

    // Ajouter une tâche
    const addTask = async (taskText) => {
        try {
            const newTask = await apiAddTask({ title: taskText, description: '' });
            setTasks([...tasks, newTask]);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la tâche:', error);
        }
    };

    // Supprimer une tâche
    const deleteTask = async (id) => {
        try {
            await apiDeleteTask(id);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche:', error);
        }
    };

    // Mettre à jour une tâche
    const updateTask = async (id, newText) => {
        try {
            const updatedTask = await apiUpdateTask(id, { title: newText });
            setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche:', error);
        }
    };

    return (
        <div>
            <h1>Ajouter une tâche</h1>
            <TaskForm addTask={addTask} />
            <h2>Liste des tâches</h2>
            <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                updateTask={updateTask}
            />
        </div>
    );
}

export default TaskDashboard;
