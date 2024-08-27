import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import home from './views/home1.vue'
import logIn from './views/logIn.vue'
import signUp from './views/signUp.vue'
import about from './views/about.vue'
import contact from './views/contact.vue'
import privacyPolicy from './views/privacyPolicy.vue'
import termsOfService from './views/termsOfService.vue'

import carousel from './components/carousel.vue'
import card from './components/card.vue'
import webFooter from './components/webFooter.vue'
import navbar from './components/navbar.vue'
import pagination from './components/pagination.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // { path: '/', component: 'App' }, // 根路徑指向 App.vue
        { path: '/', component: home },
        { path: '/logIn', component: logIn },
        { path: '/signUp', component: signUp },
        { path: '/about', component: about},
        { path: '/contact', component: contact},
        { path: '/privacyPolicy', component: privacyPolicy},
        { path: '/termsOfService', component: termsOfService},
        { path: '/home', component: home },

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
app.component('home', home);
app.component('logIn', logIn);
app.component('signUp', signUp);
app.component('about', about);
app.component('contact', contact);
app.component('privacyPolicy', privacyPolicy);
app.component('termsOfService', termsOfService);


app.mount('#app')