import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './AuthState';

export function Login({userName, authState, onAuthChange}) {
    return (
        <main className = 'container-fluid text-center'>
            <div>
                <h1>Welcome to My Movie Recommendations</h1>
                <p>Login and Rate some movies</p>
                {authState === AuthState.Authenticated && (
                    <Authenticated userName = {userName} onLogout = {() => onAuthChange(userName, AuthState.Unaunthenticated)} />
                )}
                {authState === AuthState.Unaunthenticated && (
                    <Unauthenticated userName = {userName} onLogin = {(loginUserName) => {
                        onAuthChange(loginUserName, AuthState.Authenticated);
                    }} />
                )}
            </div>
        </main>
    );
}
