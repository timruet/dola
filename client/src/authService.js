import { loginSuccess, logoutSuccess, authSuccess } from './authSlice';
import { useNavigate } from 'react-router-dom';
import { store } from './store'


export const authService = {
    async login(userdata) {
        const res = await fetch('http://localhost:8000/api/login', { credentials: 'include', mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post', body: JSON.stringify(userdata) });
        if (!res.ok) {
            throw new Error(res.status);
        }
        // Dispatch the loginSuccess action with the user data
        store.dispatch(loginSuccess(userdata));

        return userdata;
    },

    async logout() {
        let res = await fetch('http://localhost:8000/api/logout', { credentials: 'include', mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post' });
        if (!res.ok) {
            throw new Error(res.status);
        }

        // Dispatch the logoutSuccess action
        store.dispatch(logoutSuccess());
    },

    async auth() {
        let res = await fetch('http://localhost:8000/api/auth', { credentials: 'include', mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post' });
        res = await res.json();
        console.log(res);
        store.dispatch(authSuccess(res));
    }
};