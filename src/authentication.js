// import store from '@/store'
import router from '@/router'
import { setItem, getItem, removeAllItem } from '@/utils/storage'

const goList = ['/login']

router.beforeEach((to, from, next) => {
    const token = getItem('token')
    if (token) {
        if (to.path === '/login') {
            next(from.path)
        } else {
            next()
        }
    } else {
        if (goList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})