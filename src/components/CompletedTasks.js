// CompletedTasks.js
import React from 'react';

function CompletedTasks({ tasks, deleteTask }) {
    if (!tasks || tasks.length === 0) {
        return <p>Aucune tâche terminée disponible.</p>;
    }

    return (
        <div>
            <h2>Tâches terminées</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.title}
                        <button onClick={() => deleteTask(task._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CompletedTasks;
