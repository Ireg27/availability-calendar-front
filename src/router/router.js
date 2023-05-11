import Login from "@/views/LoginPage"
import Register from "../views/RegisterPage"
import Calendar from "../views/CalendarPage"
import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store/store";

export const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, meta: { layout: 'BaseLayout', requiresVisitor: true } },
    { path: '/register', component: Register, meta: { layout: 'BaseLayout', requiresVisitor: true } },
    { path: '/calendar', component: Calendar, meta: { layout: 'BaseLayout', requiresAuth: true } },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuth = store.getters.loggedIn

    if (to.meta.requiresAuth) {
        if(isAuth) {
            next();
        } else {
            next('login')
        }
    } else if(to.meta.requiresVisitor && isAuth) {
        next('calendar')
    } else {
        next()
    }
})