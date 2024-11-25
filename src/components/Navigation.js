import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Tableau de bord</Link></li>
                <li><Link to="/tasks">Tâches</Link></li>
                <li><Link to="/completed-tasks">Tâches achevées</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;
