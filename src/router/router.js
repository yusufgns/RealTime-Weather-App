import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name : "Home",
        path : "/",
        component: () => import('../view/Home.vue')
    },
    {
        name : "Maps",
        path : "/maps",
        component: () => import('../view/maps.vue') 
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router