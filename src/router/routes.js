const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Index.vue') },
      { path: '/checkout', name: 'Checkout', component: () => import('pages/Checkout.vue') }
    ]
  },

  {
    path: '/menu',
    component: () => import('layouts/MenuLayout.vue'),
    children: [
      { path: '', name: 'Menu', component: () => import('pages/MenuPage.vue') }
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
