// CompletedTasks.js
import React from 'react';

function CompletedTasks({ tasks, deleteTask }) {
    if (!tasks || tasks.length === 0) {
        return ( <div className="task-grid">
                <p>Aucune tâche terminée disponible.</p></div>);}

            return (
            <div>
                <p>Tâches terminées</p>
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
