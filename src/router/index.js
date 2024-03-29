import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store/index";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {middleware: 'auth'}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/learnFlashcards/:id',
    name: 'LearnFlashcards',
    component: () => import(/* webpackChunkName: "about" */ '../components/FlashcardsMode/FlashcardView'),
  },
  {
    path: '/CreateCard/:id',
    name: 'CreateCard',
    component: () => import(/* webpackChunkName: "about" */ '../components/FlashcardsEditing/Flashcard'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register'),
  },
  {
    path: '/calligraphy/:id',
    name: 'Calligraphy',
    component: () => import(/* webpackChunkName: "about" */ '../components/Calligraphy/Calligraphy'),
  },
  {
    path: '/Folder/:folder',
    name: 'Folder',
    component: () => import(/* webpackChunkName: "about" */ '../components/BrowseFlashcards/DecsBrowser'), //redirects to decs browser
    props: true
  },
  {
    path: '/Deck/:deck',
    name: 'Deck',
    component: () => import(/* webpackChunkName: "about" */ '../components/BrowseFlashcards/DeckOverview'),
    props: {isComingFromUser: true}
  },
  {
    path: '/shared/:id',
    name: 'globalDecs',
    component: () => import(/* webpackChunkName: "about" */ '../components/Global/GlobalDeckOverview'),
    props: true
  },
  {
    path: '/global',
    name: 'Global',
    component: () => import(/* webpackChunkName: "about" */ '../views/Global'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.meta.middleware) {
    const middleware = require(`../utilities/middleware/${to.meta.middleware}`)
    if (middleware) {
      middleware.default(to, next, store)
    }else {
      next()
    }
  }else {
    next()
  }
})

export default router
