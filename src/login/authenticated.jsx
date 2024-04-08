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
            <button type="button" class="btn btn-primary" onclick={() => navigate('/rate')}>Rate</button>
            <button type="button" class="btn btn-secondary" onclick={() => logout()}>Logout</button>
        </div>
    );
}