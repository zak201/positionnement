// TaskItem.js
import React, { useState } from 'react';

function TaskItem({ task, deleteTask, updateTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(task.title);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateTask(task._id, newText);
        setIsEditing(false);
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
                    <span>{task.title}</span>
                    <button onClick={handleEdit}>Modifier</button>
                    <button onClick={() => deleteTask(task._id)}>Supprimer</button>
                </>
            )}
        </div>
    );
}

export default TaskItem;