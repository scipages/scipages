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
        component: () => import('pages/intro/Index.vue'),
        meta: { title: '' }
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
        path: 'index',
        name: 'main_index',
        component: () => import('pages/main/Index.vue'),
        meta: { title: 'Pages' },
        props: true
      },
      {
        path: 'courses',
        name: 'main_courses',
        component: () => import('pages/main/Courses.vue'),
        meta: { title: 'Teaching/Courses' },
        props: true
      },
      {
        path: 'test',
        name: 'main_test',
        component: () => import('pages/main/Test.vue'),
        meta: { title: '' }
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
