import { registerDomainSuccess, getDomainSuccess, addDomainSuccess, deleteDomainSuccess, setDomainSuccess } from './domainSlice';
import { store } from './store'


export const domainService = {
    async addDomain(userid, domain) {
        let res = await fetch('http://localhost:8000/api/addUserDomains', { credentials: 'include', mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post', body: JSON.stringify({ userid: userid, domain: domain }) });
        if (!res.ok) {
            throw new Error(res.status);
        }
        res = await res.json();
        store.dispatch(addDomainSuccess(res));
    },
    async deleteDomain(userid, domain) {
        let res = await fetch('http://localhost:8000/api/deleteUserDomains', { credentials: 'include', mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post', body: JSON.stringify({ userid: userid, domain: domain }) });
        if (!res.ok) {
            throw new Error(res.status);
        }
        res = await res.json();
        store.dispatch(deleteDomainSuccess(res));
    },
    async registerDomain(userid) {
        let res = await fetch('http://localhost:8000/api/createUserDomains', { credentials: 'include', mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post', body: JSON.stringify({ userid: userid }) });
        if (!res.ok) {
            throw new Error(res.status);
        }
        res = res.json();
        store.dispatch(registerDomainSuccess(res.domains));
    },
    async getDomains(userid) {
        let res = await fetch('http://localhost:8000/api/getUserDomains', { credentials: 'include', mode: "cors", headers: { 'Content-Type': 'application/json' }, method: 'post', body: JSON.stringify({ userid: userid }) });
        if (!res.ok) {
            throw new Error(res.status);
        }
        res = await res.json();
        store.dispatch(getDomainSuccess(res));
    },

    async setDomain(domain) {
        store.dispatch(setDomainSuccess(domain));
    },
};