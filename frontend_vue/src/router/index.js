import { createWebHistory, createRouter } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/HelloWorld'),
    meta: {
      reload: true,
    }
  },
  {
    path: '/view',
    name: 'view',
    component: () => import('../components/ListComponent')
  }, 
  {
    path: '/identity',
    name: 'identity',
    component: () => import('../components/IdentityComponent')
  }, 
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/SignupComponent')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../components/SigninComponent')
  },
  {
    path: '/signout',
    name: 'signout',
    component: () => import('../components/SignoutComponent')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../components/EditComponent')
  }
]

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router