import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Hello.vue'
import DoctorList from '../components/DoctorList/doctorList'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
    issuer: 'https://dev-405206.okta.com/oauth2/default',
    client_id: '0oa1brv3lz6TH5qrE357',
    redirect_uri: 'http://localhost:8080/implicit/callback',
    scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'host',
            component: Home
        },
        {
            path: '/implicit/callback',
            component: Auth.handleCallback()
        },
        {
            path: '/doctors',
            name: 'doctorList',
            component: DoctorList,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router