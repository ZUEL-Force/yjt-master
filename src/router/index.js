import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/view/index'),
            redirect: '/problem',
            //子路由
            children: [
                {
                    path:'/problem',
                    name:'problem',
                    component: () => import('@/view/problems/problem.vue')
                },
                {
                    path:'/paper',
                    name:'paper',
                    component: () => import('@/view/problems/paper.vue'),
                },
                {
                    path:'/user',
                    name:'user',
                    component: () => import('@/view/user/user.vue'),
                }

            ]
        },
        {
            path:'/login',
            name:'login',
            component:()=>import('@/view/user/login'),
        }
    ]
})

export default router
