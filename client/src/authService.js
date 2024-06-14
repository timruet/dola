import { loginSuccess, logoutSuccess } from './authSlice';
import { useNavigate } from 'react-router-dom';
import {store} from './store'


export const authService = {
    async login(userdata) {
        // Replace this with your actual login logic (e.g., API call)
        const res = await fetch('http://localhost:8000/api/login', { mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post', body: JSON.stringify(userdata) });
        if (!res.ok) {
            throw new Error(res.status);
        }
        // Dispatch the loginSuccess action with the user data
        store.dispatch(loginSuccess(userdata));

        return userdata;
    },

    async logout() {
        const res = await fetch('http://localhost:8000/api/logout', { mode: "cors", method: 'get' });
        if (!res.ok) {
            throw new Error(res.status);
        }

        // Dispatch the logoutSuccess action
        store.dispatch(logoutSuccess());
    },
};