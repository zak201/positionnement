// TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask, updateTask }) {
    return (
        <div className="task-grid">
            {tasks.length === 0 ? (
                <p>Aucune tâche disponible.</p>
            ) : (
                tasks.map(task => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                    />
                ))
            )}
        </div>
    );
}

export default TaskList;
