import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'intro-layout',
    component: () => import('layouts/IntroLayout.vue'),
    children: [
      {
        path: '',
        name: 'intro_index',
        component: () => import('pages/intro/Index.vue')
      }
    ]
  },

  {
    path: '/main/:uuid',
    name: 'main-layout',
    component: () => import('layouts/MainLayout.vue'),
    props: true,
    children: [
      {
        path: '/index',
        name: 'main_index',
        component: () => import('pages/main/Index.vue')
      },
      {
        path: '/test',
        name: 'main_test',
        component: () => import('pages/main/Test.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'error404',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
