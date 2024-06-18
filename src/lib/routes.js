import { Home, ImagesList, ImagesPanel } from '../pages'

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
    {
      path: 'images-list',
      component: ImagesList,
    },
  ],
}
