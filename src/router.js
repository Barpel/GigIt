import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import login from './views/login.vue'
import register from './views/register.vue'
import gig from './views/gig.vue'
import gigEdit from './views/gigEdit.vue'
import gigDetails from './views/gigDetails.vue'
import userGigs from './views/userGigs.vue'
import userProfile from './views/userProfile.vue'
import inbox from './views/inbox.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/gig',
      name: 'gigs',
      component: gig
    },
    {
      path: '/gig/:type',
      name: 'gigsCategories',
      component: gig
    },
    {
      path: '/gig/edit/:gigId?',
      name: 'gigEdit',
      component: gigEdit
    },
    {
      path: '/gig/:gigId',
      name: 'gigDetails',
      component: gigDetails
    },
    {
      path: '/user/login',
      name: 'login',
      component: login,
    },
    {
      path: '/user/register',
      name: 'register',
      component: register,
    },
    {
      path: '/user/:userId/gigs',
      name: 'publishedGigs',
      component: userGigs,
    },
    {
      path: '/user/:userId',
      name: 'userProfile',
      component: userProfile,
    },
    {
      path: '/user/:userId/inbox',
      name: 'inbox',
      component: inbox,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/about.vue')
    },
    
  ]
})
