import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import logIn from './components/logIn.vue'
import singUp from './components/singUp.vue'

import carousel from './components/carousel.vue'
import card from './components/card.vue'
import webFooter from './components/webFooter.vue'
import navbar from './components/navbar.vue'
import pagination from './components/pagination.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: 'App' }, // 根路徑指向 App.vue
        { path: '/logIn', component: logIn },
        { path: '/singUp', component: singUp },

        // { path: '/home', component: home },
        // { path: '/medals', component: medals },
        // { path: '/', redirect: '/home' },  //回到主頁面的意思
    ]
});

const app = createApp(App)

app.use(router);
app.component('carousel', carousel);
app.component('card', card);
app.component('webFooter', webFooter);
app.component('navbar', navbar);
app.component('pagination', pagination);
app.component('logIn', logIn);
app.component('singUp', singUp);


app.mount('#app')