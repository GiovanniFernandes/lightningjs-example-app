import { Home, ImagesPanel } from '../pages'

export default {
  root: 'home',
  routes: [
    {
      path: 'home',
      component: Home,
    },
    {
      path: 'images-panel',
      component: ImagesPanel,
    },
  ],
}
