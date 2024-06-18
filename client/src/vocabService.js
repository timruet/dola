import { useNavigate, useSelector } from 'react-router-dom';
import { store } from './store'


export const vocabService = {
    async setVocabulary(userid, domain) {
        let res = await fetch('http://localhost:8000/api/setVocabulary', { credentials: 'include', mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post', body: JSON.stringify({ userid: userid, domain: domain }) });
        if (!res.ok) {
            throw new Error(res.status);
        }
        res = await res.json();
    }
};