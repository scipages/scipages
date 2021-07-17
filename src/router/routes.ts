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
        component: () => import('pages/main/ContentIndex.vue'),
        meta: { title: 'Pages' },
        props: true
      },
      {
        path: 'basic-info',
        name: 'main_basic_info',
        component: () => import('pages/main/ContentBasicInfo.vue'),
        meta: { title: 'Basic Info' },
        props: true
      },
      {
        path: 'publications',
        name: 'main_publications',
        component: () => import('pages/main/ContentPublications.vue'),
        meta: { title: 'Publications' },
        props: true
      },
      {
        path: 'projects',
        name: 'main_projects',
        component: () => import('pages/main/ContentProjects.vue'),
        meta: { title: 'Projects' },
        props: true
      },
      {
        path: 'news',
        name: 'main_news',
        component: () => import('pages/main/ContentNews.vue'),
        meta: { title: 'News/Highlights' },
        props: true
      },
      {
        path: 'people',
        name: 'main_people',
        component: () => import('pages/main/ContentPeople.vue'),
        meta: { title: 'People' },
        props: true
      },
      {
        path: 'courses',
        name: 'main_courses',
        component: () => import('pages/main/content/Content.vue'),
        meta: { title: 'Teaching/Courses' },
        props: true,
        children: [
          {
            path: 'index',
            name: 'main_courses_index',
            component: () => import('pages/main/content/courses/ContentCoursesIndex.vue'),
            meta: { title: 'Teaching/Courses' },
            props: true
          },
          {
            path: 'create',
            name: 'main_courses_create',
            component: () => import('pages/main/content/courses/ContentCoursesCreate.vue'),
            meta: { title: 'Teaching/Courses - New Course' },
            props: true
          }
          // {
          //   path: 'update/:id',
          //   name: 'main_courses_update',
          //   component: () => import('pages/main/content/courses/ContentCoursesUpdate.vue'),
          //   meta: { title: 'Teaching/Courses - Update Course' },
          //   props: true
          // }
        ]
      },
      {
        path: 'software',
        name: 'main_software',
        component: () => import('pages/main/ContentSoftware.vue'),
        meta: { title: 'Software/Code' },
        props: true
      },
      {
        path: 'social-media',
        name: 'main_social_media',
        component: () => import('pages/main/ContentSocialMedia.vue'),
        meta: { title: 'Social Media' },
        props: true
      },
      {
        path: 'static-files',
        name: 'main_static_files',
        component: () => import('pages/main/ContentStaticFiles.vue'),
        meta: { title: 'Static Files' },
        props: true
      },
      {
        path: 'site-settings',
        name: 'main_site_settings',
        component: () => import('pages/main/ConfigurationSiteSettings.vue'),
        meta: { title: 'Site Settings' },
        props: true
      },
      {
        path: 'theme',
        name: 'main_theme',
        component: () => import('pages/main/ConfigurationTheme.vue'),
        meta: { title: 'Theme' },
        props: true
      },
      {
        path: 'server',
        name: 'main_server',
        component: () => import('pages/main/ConfigurationServer.vue'),
        meta: { title: 'Server/Host' },
        props: true
      },
      {
        path: 'git',
        name: 'main_git',
        component: () => import('pages/main/ConfigurationGit.vue'),
        meta: { title: 'Git Synchronization' },
        props: true
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
