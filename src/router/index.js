import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Test from '../components/test'
import DoctorList from '../components/DoctorList/DoctorComponent.vue'
import AppointmentList from '../components/AppointmentList/AppointmentComponent'
import PatientList from '../components/PatientList/PatientComponent.vue'
import MyProfile from '../components/MyProfile/MyProfile'
import Auth from '@okta/okta-vue'
import DoctorDetails from "../components/DoctorList/DoctorDetails.vue";
import PatientDetails from "../components/PatientList/PatientDetails.vue";
import Drag from '../components/Drag.vue'
import 'semantic-ui-css/semantic.min.css';

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
            component: Test,
        },
        {
            path: '/implicit/callback',
            component: Auth.handleCallback()
        },
        {
            path: '/doctorList',
            name: 'doctorList',
            component: DoctorList,
            // meta: {
            //     requiresAuth: true
            // }
        },

        {
            path: '/patientList',
            name: 'patientList',
            component: PatientList,
            // meta: {
            //     requiresAuth: true
            // }
        },

        {
            path: '/appointmentList',
            name: 'appointmentList',
            component: AppointmentList,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: '/myProfile',
            name: 'profile',
            component: MyProfile,
            // meta: {
            //     requiresAuth: true
            // }
        },
        {
            path: '/home',
            name: 'home',
            component: Test,
            // meta: {
            //     requiresAuth: true
            // }


        },

        {
            path: '/doctorDetails',
            name: 'doctorDetails',
            component: DoctorDetails,
            // meta: {
            //     requiresAuth: true
            // },
            props: true
        },

        {
            path: '/patientDetails',
            name: 'patientDetails',
            component: PatientDetails,
            // meta: {
            //     requiresAuth: true
            // },
            props: true
        },


        {
            path: '/drag',
            name: 'drag',
            component: Drag,
            // meta: {
            //     requiresAuth: true
            // },
            props: true
        },
    ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router