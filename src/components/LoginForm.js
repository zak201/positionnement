import React, { useState } from 'react';
import { login } from '../services/api';

function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Appelle la fonction login définie dans api.js
            const { accessToken } = await login(username, password);
            localStorage.setItem('token', accessToken);
            onLoginSuccess(); // Appel de la fonction de succès pour continuer
        } catch (error) {
            setError('Nom d\'utilisateur ou mot de passe incorrect');
            console.error('Erreur lors de la connexion :', error);
        }
    };

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Nom d'utilisateur:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default LoginForm;
