import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',

        component: () =>
            import ( /* webpackChunkName: "about" */ '@/layout/home'),
        meta: {
            title: '控制台'
        },
        children: [{
            path: '/',
            component: () =>
                import ('../views/home')
        }]
    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Login/index')
    },
    {
        path: '/sys',
        name: 'sys',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/layout/home'),
        redirect: '/sys/users',
        meta: {
            title: '系统管理'
        },
        children: [{
                path: '/sys/users',
                component: () =>
                    import ('../views/Users/index'),
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: '/sys/menus',
                component: () =>
                    import ('../views/Menu/index'),
                meta: {
                    title: '菜单管理'
                }
            },
            {
                path: '/sys/roles',
                component: () =>
                    import ('../views/Role/index'),
                meta: {
                    title: '角色管理'
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router