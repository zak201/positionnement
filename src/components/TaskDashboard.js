import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function TaskDashboard() {
    const [tasks, setTasks] = useState([]);

    const toggleComplete = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const addTask = (taskText) => {
        const newTask = {
            id: Date.now(),
            task: taskText,
            completed: false,
        };
        setTasks([...tasks, newTask]);
    };

    const updateTask = (id, newText) => {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, task: newText };
            }
            return task;
        }));
    };

    return (
        <div>
            <h1>Ajouter une tâche</h1>
            <TaskForm addTask={addTask} />
            <h2>Liste des tâches</h2>
            <TaskList
                tasks={tasks.filter(task => !task.completed)}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
                updateTask={updateTask}
            />
        </div>
    );
}

export default TaskDashboard;
