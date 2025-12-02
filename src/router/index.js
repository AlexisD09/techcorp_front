import { createRouter, createWebHistory } from 'vue-router'

// Import des pages
import Dashboard from '@/pages/Dashboard.vue'
import Tools from '@/pages/Tools.vue'
import Analytics from '@/pages/Analytics.vue'
// import NotFound from '@/views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/tools',
        name: 'Tools',
        component: Tools
    },
    {
        path: '/analytics',
        name: 'Analytics',
        component: Analytics
    },
    /*{
        path: '/:catchAll(.*)', // Route 404
        name: 'NotFound',
        component: NotFound
    }*/
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router