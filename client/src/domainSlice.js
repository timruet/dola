import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    domains: ['Eldercare', 'Construction'],
    domain: null
};

const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);

const domainSlice = createSlice({
    name: 'domain',
    initialState,
    reducers: {
        addDomainSuccess: (state, action) => {
            if (!compareArrays(state.domains, action.payload)) {
                state.domains = action.payload;
            }
        },
        deleteDomainSuccess: (state, action) => {
            if (!compareArrays(state.domains, action.payload)) {
                state.domains = action.payload;
            }
        },
        registerDomainSuccess: (state, action) => {
            if (state.domains !== action.payload) {
                state.domains = action.payload;
            }
        },
        getDomainSuccess: (state, action) => {
            if (!compareArrays(state.domains, action.payload)) {
                state.domains = action.payload;
            }
        },
        setDomainSuccess: (state, action) => {
            if (state.domain !== action.payload) {
                state.domain = action.payload;
            }
        }
    }
});

export const { addDomainSuccess, registerDomainSuccess, getDomainSuccess, deleteDomainSuccess, setDomainSuccess } = domainSlice.actions;
export default domainSlice.reducer;