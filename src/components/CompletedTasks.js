import React from 'react';

function CompletedTasks({ tasks, deleteTask }) {
    return (
        <div>
            {tasks.length === 0 ? (
                <p>Aucune tâche achevée.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            {task.task}
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CompletedTasks;
