import React from "react";
import { useNavigate } from 'react-router-dom';

import './login.css';

export function Authenticated (props) {
    const navigate = useNavigate();

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
          })
            .catch(() => {
              
            })
            .finally(() => {
              localStorage.removeItem('userName');
              props.onLogout();
            });
    }

    return (
        <div>
            <div id = "Hello">Hello: </div>
            <div className = 'userName' id="Username">{props.userName}</div>
            <button type="button" className="rateBtn btn btn-primary" onClick={() => navigate('/ratings')}>Rate</button>
            <button type="button" className="logoutBtn btn btn-secondary" onClick={() => logout()}>Logout</button>
        </div>
    );
}