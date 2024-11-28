import React, { useState } from 'react';

function TaskForm({ addTask }) {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim()) {
            addTask(task); // Appelle la fonction pour ajouter une tâche
            setTask(''); // Réinitialise le champ d'entrée
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Ajouter une nouvelle tâche"
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TaskForm;
