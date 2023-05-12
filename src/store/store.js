import { createStore } from 'vuex';

export default createStore({
    state: {
        accessToken: localStorage.getItem('accessToken') || null,
        userId: localStorage.getItem('userId') || null,
    },
    mutations: {
        login(state, authenticationData) {
            state.accessToken = authenticationData.accessToken
            state.userId = authenticationData.userId
        },
        logout(state) {
            state.accessToken = '';
            state.refreshToken = '';
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
        }
    },
    actions: {
        login: async ({commit}, payload) => {
            const data = payload.data.data;

            const authenticationData = {
                accessToken: data.access_token,
                userId: data.user_id,
            }

            localStorage.setItem('accessToken', authenticationData.accessToken)
            localStorage.setItem('userId', authenticationData.userId)

            commit('login', authenticationData);
        },
        logout: async ({ commit }) => {
            commit('logout');
        }
    },
    getters: {
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