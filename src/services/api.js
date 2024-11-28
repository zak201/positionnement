import axios from 'axios';

// URL du back-end déployé sur Render
const apiBaseUrl = 'https://positionnementynov.onrender.com';

// Fonction pour obtenir le token à partir du localStorage (ou toute autre méthode de stockage)
const getToken = () => {
    return localStorage.getItem('token');
};

// Instance Axios avec l'ajout dynamique de l'en-tête Authorization
const apiClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
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

// Mettre à jour une tâche
export const updateTask = async (id, updatedTask) => {
    const response = await apiClient.put(`/tasks/${id}`, updatedTask);
    return response.data;
};

export default apiClient;
