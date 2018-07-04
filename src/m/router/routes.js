const load = component => () => import(`../views/${component}.vue`)
export default [
  {
    path: '/',
    component: load('index'),
    meta: {keepAlive: true}
  },
  {
    path: '/demo',
    component: load('demo'),
    meta: {keepAlive: true}
  }
]
