import Vue from 'vue'
import VueRouter from 'vue-router'
import Upload from '../views/Upload'
import ImageProcess from '../views/ImageProcess'
import Home from '../components/Home'
import Success from '../views/Success'
import Fail from '../views/Fail'
import Result from '../views/Result'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      redirect: { name:'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/imageprocess',
      name: 'ImageProcess',
      component: ImageProcess,
      props: true
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    },
    {
      path: '/fail',
      name: 'Fail',
      component: Fail
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]

  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router