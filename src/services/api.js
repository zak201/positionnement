import axios from 'axios';

// URL du back-end déployé sur Render
const apiBaseUrl = 'https://positionnementynov.onrender.com';

// Instance Axios
const apiClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Obtenir toutes les tâches
export const getTasks = async () => {
    const response = await apiClient.get('/tasks');
    return response.data;
};

// Ajouter une tâche
export const addTask = async (task) => {
    const response = await apiClient.post('/tasks', task);
    return response.data;
};

// Supprimer une tâche
export const deleteTask = async (id) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
};

// Marquer une tâche comme terminée
export const updateTask = async (id, updatedTask) => {
    const response = await apiClient.put(`/tasks/${id}`, updatedTask);
    return response.data;
};


export default apiClient;
