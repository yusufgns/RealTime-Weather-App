import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name : "Home",
        path : "/",
        component: () => import('../view/Home.vue')
    },
    {
        name : "LocationMaps",
        path : "/locationmaps",
        component: () => import('../view/GoogleMaps.vue')
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router