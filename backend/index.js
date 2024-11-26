// Importer les modules nécessaires
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Utiliser bodyParser pour les requêtes JSON
app.use(bodyParser.json());

// Ajouter CORS pour permettre au front-end de se connecter au back-end
app.use(cors());

// Base de données fictive pour stocker les tâches et utilisateurs
let tasks = [];
let users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' }
];

// Clé secrète pour JWT
const SECRET_KEY = 'votre_cle_secrete';

// Middleware pour vérifier le token JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authentification en cours...');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                console.error('Erreur de vérification du token:', err);
                return res.sendStatus(403);
            }
            req.user = user;
            console.log("Authentification réussie pour l'utilisateur:", user.username);
            next();
        });
    } else {
        console.warn("Aucun en-tête d'autorisation fourni.");
        res.sendStatus(401);
    }
};

// Middleware pour vérifier le rôle "admin"
const authorizeAdmin = (req, res, next) => {
    console.log('Vérification des privilèges administrateur...');
    if (req.user.role !== 'admin') {
        console.warn('Accès refusé : utilisateur sans privilèges administrateur:', req.user.username);
        return res.status(403).send("Accès refusé : Vous n'êtes pas autorisé à effectuer cette action.");
    }
    console.log("Privilèges administrateur confirmés pour l'utilisateur:', req.user.username");
    next();
};

// Route de connexion pour obtenir le token JWT
app.post('/login', (req, res) => {
    console.log('Tentative de connexion...');
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const accessToken = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY);
        console.log("Connexion réussie pour l'utilisateur:", username);
        res.json({ accessToken });
    } else {
        console.warn("Nom d'utilisateur ou mot de passe incorrect pour:", username);
        res.status(401).send("Nom d'utilisateur ou mot de passe incorrect.");
    }
});

// Routes CRUD pour les tâches

// Créer une nouvelle tâche
app.post('/tasks', authenticateJWT, (req, res) => {
    console.log("Création d'une nouvelle tâche...");
    const task = req.body;
    task.id = tasks.length + 1;
    tasks.push(task);
    console.log('Tâche créée avec succès:', task);
    res.status(201).json(task);
});

// Lire toutes les tâches
app.get('/tasks', authenticateJWT, (req, res) => {
    console.log('Lecture de toutes les tâches...');
    res.json(tasks);
});

// Mettre à jour une tâche
app.put('/tasks/:id', authenticateJWT, (req, res) => {
    console.log("Mise à jour de la tâche avec l'ID:", req.params.id);
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        console.log('Tâche mise à jour avec succès:', tasks[taskIndex]);
        res.json(tasks[taskIndex]);
    } else {
        console.warn("Tâche non trouvée pour l'ID:", taskId);
        res.status(404).send('Tâche non trouvée.');
    }
});

// Supprimer une tâche (admin uniquement)
app.delete('/tasks/:id', authenticateJWT, authorizeAdmin, (req, res) => {
    console.log("Suppression de la tâche avec l'ID:", req.params.id);
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        console.log('Tâche supprimée avec succès.');
        res.sendStatus(204);
    } else {
        console.warn("Tâche non trouvée pour l'ID:", taskId);
        res.status(404).send('Tâche non trouvée.');
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
