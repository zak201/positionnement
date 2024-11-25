import React, { useState } from 'react';

function TaskItem({ task, toggleComplete, deleteTask, updateTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(task.task);

    const handleEdit = () => {
        if (isEditing) {
            // Envoie la mise à jour au parent
            updateTask(task.id, newText);
        }
        setIsEditing(!isEditing);
    };


    return (
        <div className="task-item">
            {isEditing ? (
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                />
            ) : (
                <span onClick={() => toggleComplete(task.id)}>
                    {task.task}
                </span>
            )}
            <div className="button-container">
                <button className="edit-btn" onClick={handleEdit}>
                    {isEditing ? 'Save' : 'Modifier'}
                </button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                    Supprimer
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
