import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';
axios.defaults.withCredentials = true;

function getCrsfToken() {
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : null;
}

const crsfToken = getCrsfToken();
if (crsfToken) {
    axios.defaults.headers.common['X-CSRFToken'] = crsfToken;
}

axios.interceptors.response.use(response => response, 
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && store.state.isAuthenticated === true) {
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    await axios.post('/jwt/refresh/');
                    return axios(originalRequest);
                } catch (error) {
                    store.commit('setIsAuthenticated', false);
                    router.push('/login');
                }
            }
        }
        return Promise.reject(error);
    }
);

createApp(App).use(store).use(router, axios).mount('#app');