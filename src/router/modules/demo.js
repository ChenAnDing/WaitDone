
export default [
  {
    name: 'demo',
    path: '/demo',
    component: () => import('@/views/demo/index')
  },
  {
    name: 'demo2',
    path: '/demo2/:id', 
    component: () => import('@/views/demo/demo2')
  },
  {
    name: 'draggableDom',
    path: '/draggableDom',
    component: () => import('@/views/draggableDom/index')
  }
]