import { verification, login, info, menu } from '@/api/login'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        imgs: '',
        key: '',
        token: getItem('token') || '',
        menus: [],
        avatar: '',
        nameinfo: '',
        tags: [{
            fullPath: '/',
            meta: { title: '控制台' },
            path: '/'
        }]
    },
    getters: {},
    mutations: {
        essential(state, data) {
            state.imgs = data.captchaImg
            state.key = data.token
                // setItem('key')
        },
        token(state, data) {
            state.token = data
            setItem('token', data)
        },
        menu(state, data) {
            state.menus = data.menus
        },
        userinfo(state, data) {
            state.avatar = data.avatar
            state.nameinfo = data.username
        },
        tags(state, data) {
            const index = state.tags.findIndex((itm) => {
                return itm.path === data.path
            })
            if (index === -1) {
                state.tags.push(data)
            }
        },
        closeTags(state, name) {
            const index = state.tags.findIndex((itm) => {
                return itm.meta.title === name
            })
            state.tags.splice(index, 1)
        },
        AllError(state) {
            state.tags = [{
                fullPath: '/',
                meta: { title: '控制台' },
                path: '/'
            }]
        }
    },
    actions: {
        async getlogin({ commit }) {
            try {
                const { data } = await verification()
                commit('essential', data.data)
            } catch (error) {
                console.log(error)
            }
        },
        async Login({ commit }, form) {
            try {
                const string = `username=${form.username}&password=${form.password}&code=${form.code}&token=${form.token}`
                const { data } = await login(string)
                commit('token', data.data)
                if (data.data) {
                    router.push('/')
                }
            } catch (error) {
                console.log(error)
            }
        },
        async navMenu({ commit }) {
            try {
                const { data } = await menu()
                commit('menu', data.data)
            } catch (error) {
                console.log(error)
            }
        },
        async herinfo({ commit }) {
            try {
                const { data } = await info()
                commit('userinfo', data.data)
            } catch (error) {
                console.log(error)
            }
        },
        error() {
            removeAllItem()
            router.push('/login')
        },
        tags({ commit }, data) {
            commit('tags', data)
        },
        closeTags({ commit }, name) {
            commit('closeTags', name)
        },
        AllError({ commit }) {
            commit('AllError')
        }
    }
}