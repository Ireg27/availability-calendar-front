import { createStore } from 'vuex';

export default createStore({
    state: {
        count: 0,
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        userId: localStorage.getItem('userId') || null,
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        decrement(state) {
            state.count--;
        },
        login(state, authenticationData) {
            state.accessToken = authenticationData.accessToken
            state.refreshToken = authenticationData.refreshToken
            state.userId = authenticationData.userId
        },
        logout(state) {
            state.accessToken = '';
            state.refreshToken = '';
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
        }
    },
    actions: {
        increment({ commit }) {
            commit('increment');
        },
        decrement({ commit }) {
            commit('decrement');
        },
        login: async ({commit}, payload) => {
            const data = payload.data.data;

            const authenticationData = {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                userId: data.user_id,
            }

            localStorage.setItem('accessToken', authenticationData.accessToken)
            localStorage.setItem('refreshToken', authenticationData.refreshToken)
            localStorage.setItem('userId', authenticationData.userId)

            commit('login', authenticationData);
        },
        logout: async ({ commit }) => {
            commit('logout');
            // await router.push({ name: 'Login' })
        }
    },
    getters: {
        doubleCount(state) {
            return state.count * 2;
        },
        loggedIn({ accessToken }) {
            return !!accessToken;
        },
        accessToken({ accessToken }) {
            return accessToken;
        },
        userId({ userId }) {
            return userId;
        }
    },
});