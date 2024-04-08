import React from 'react';
import './unauthenticated.css'

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');

    async function login() {
        loginUserCreateUser(`/api/auth/login`);
    }
    
    async function create() {
        loginUserCreateUser(`/api/auth/create`);
    }

    async function loginUserCreateUser(urlEndpoint) {
        const response = await fetch(urlEndpoint, {
            method: 'post',
            body: JSON.stringify({ userName: userName, password: password }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });
    
        if(response.ok) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            const errorMessage = await response.json();
            alert(errorMessage.error);
        }
    }

    return (
        <div className = "user-input" id = "loginControls">
            <input type = "text" id = "name" value = {userName} onChange = {(e) => setUserName(e.target.value)} placeholder = "Username"/>
            <input type = "password" id = "password" onChange={(e) => setPassword(e.target.value)} placeholder= "Password"/>
            <button type = "button" className = "loginBtn btn btn-primary" onClick={() => login()}>Login and Rate</button>
            <button type = "button" className = "createBtn btn btn-secondary" onClick={() => create()}>Create User</button>
        </div>
    );
}