const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/menu',
    component: () => import('layouts/MenuLayout.vue'),
    children: [
      { path: '', name: 'Menu', component: () => import('pages/MenuPage.vue') }
    ]
  },

  {
    path: '/checkout',
    component: () => import('layouts/Checkout.vue'),
    children: [
      {
        path: '',
        name: 'Checkout',
        component: () => import('pages/Checkout.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
