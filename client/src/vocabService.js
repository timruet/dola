import { useNavigate, useSelector } from 'react-router-dom';
import { store } from './store'


export const vocabService = {
    async setVocabulary(userid, domain) {
        let res = await fetch('http://localhost:8000/api/setVocabulary', { credentials: 'include', mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post', body: JSON.stringify({ userid: userid, domain: domain }) });
        if (!res.ok) {
            throw new Error(res.status);
        }
        res = await res.json();
    },

    async getVocabulary(userid, domain){
        let res = await fetch('http://localhost:8000/api/getVocabulary', { credentials: 'include', mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post', body: JSON.stringify({ userid: userid, domain: domain }) });
        if (!res.ok) {
            throw new Error(res.status);
        }
        res = await res.json();
        return res;
    },
    async getVocabByID(userid, domain, vocabID){
        let res = await fetch('http://localhost:8000/api/getVocabByID', { credentials: 'include', mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post', body: JSON.stringify({userid: userid, vocabID: vocabID, domain:domain}) });
        res = res.json();
        return(res);
    }
};