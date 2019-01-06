import Vue from 'vue'
import Router from 'vue-router'
//import Dashboard from './views/Dashboard.vue'
//import Home from './views/Home.vue'
Vue.use(Router)
let baseURL ='https://80uim6qgpb.execute-api.ap-south-1.amazonaws.com/dev/'

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView('Home')
    },

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: loadView('Dashboard')
    },
    {
      path: '/productdetails/:productsku',
      name: 'Productdetails',
      component: loadView('ProductDetails')
    },
    {
      path: '/addproduct',
      name: 'AddProduct',
      component: loadView('AddProduct')
    },
    {
      path: '/orders',
      name: 'Orders',

      component: loadView('Orders')
    },
    {
      path: '/orderdetails/:orderid',
      name: 'Orderdetails',
      component: loadView('OrderDetails')
    },
    {
      path: '/copyproduct/:sku',
      name: 'Copyproduct',
      component: loadView('CopyProduct')
    },
    {
      path: '/addsuccess/:sku',
      name: 'Successlink',
      component: loadView('SuccessLink')
    },
    {
      path: '/upload',
      name: 'Upload',
      component: loadView('Upload')
    },

  ]
})
// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if(to.name == 'Dashboard') { // check if "to"-route is "callback" and allow access
    next()
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next()
  } else { // trigger auth0 login
    router.app.$auth.login()
    //console.log("auth: ", router.app.$auth)
  }
})
export default router
