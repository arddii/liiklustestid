import { createStore } from 'vuex';

export default createStore({
    state: {
        loading: false,
        history: localStorage.getItem('test-history') ? JSON.parse(localStorage.getItem('test-history')) : [],
    },

    actions: {
        add_to_history({state}, payload) {
            state.history.unshift(payload);
            localStorage.setItem('test-history', JSON.stringify(state.history));
        }
    },
});
