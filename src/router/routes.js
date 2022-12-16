const routes = [
  {
    path: '/deposit-accounts',
    component: () => import('layouts/AccountsLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/AccountsDashboardPage.vue') },
    ],
  },
  {
    path: '/dashboard/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/DashboardPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/LoginPage.vue') },
      { path: 'login', component: () => import('src/pages/LoginPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
