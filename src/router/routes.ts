import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main-layout',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('pages/Test.vue')
      },
      {
        path: 'project/:uuid',
        name: 'project',
        component: () => import('pages/Project.vue'),
        props: true,
        children: [
          {
            path: '/index',
            name: 'project_index',
            component: () => import('pages/project/Index.vue')
          }
        ]
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
