// TaskItem.js
import React, { useState } from 'react';

function TaskItem({ task, deleteTask, updateTask, toggleComplete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(task.title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateTask(task._id, newText);
        setIsEditing(false);
    };

    const handleToggleComplete = () => {
        toggleComplete(task._id, !task.completed); // Appeler toggleComplete avec l'état opposé de la tâche
    };

    return (
        <div className="task-item">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                    />
                    <button onClick={handleSave}>Sauvegarder</button>
                </>
            ) : (
                <>
                    <span
                        onClick={handleToggleComplete} // Marquer la tâche comme terminée/non terminée
                        style={{textDecoration: task.completed ? 'line-through' : 'none'}}
                    >
                        {task.title}
                    </span>
                    <button onClick={handleEdit}>Modifier</button>
                    <button onClick={() => deleteTask(task._id)}>Supprimer</button>
                    <button onClick={handleToggleComplete}>Achever</button>
                </>
            )}
        </div>
    );
}

export default TaskItem;
