// TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks = [], deleteTask, updateTask, toggleComplete }) {
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
                        toggleComplete={toggleComplete}
                    />
                ))
            )}
        </div>
    );
}

export default TaskList;
