
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/menu',
    component: () => import('layouts/MenuLayout.vue'),
    children: [
      { path: 'east', name: 'East', component: () => import('pages/East.vue') },
      { path: 'west', name: 'West', component: () => import('pages/West.vue') },
      { path: 'drinks', name: 'Drinks', component: () => import('pages/Drinks.vue') }
    ]
  },

  {
    path: '/checkout',
    component: () => import('layouts/Checkout.vue'),
    children: [
      { path: '', name: 'Checkout', component: () => import('pages/Checkout.vue') }
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
