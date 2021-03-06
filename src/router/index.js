import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(Router)
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `../components/${view}.vue`)
}

Vue.use(Router)

const router = new Router({
  // ordinary user pages
  routes: [
    {
      path: '/',
      component: loadView('user/layout'),
      children: [
        {
          path: '',
          name: 'homepage',
          component: loadView('user/display/homepage')
        },
        {
          path: 'market',
          name: 'market',
          component: loadView('user/display/market')
        },
        {
          path: 'book_detail/:id',
          name: 'book',
          component: loadView('user/display/book_detail')
        },
        {
          path: 'redeem',
          name: 'redeem',
          component: loadView('user/display/redeem/index')
        },
        {
          path: 'apply_mortgage',
          name: 'apply_mortgage',
          component: loadView('user/display/apply_mortgage/index')
        },
        {
          path: 'sell',
          name: 'sell',
          component: loadView('user/display/sellers/sell')
        },
        {
          path: 'account',
          name: 'account',
          component: loadView('user/display/account/index')
        }
      ]
    },
    // user account pages
    {
      path: '/user/register',
      name: 'register',
      component: loadView('user/user_sys/register')
    },
    {
      path: '/user/login',
      name: 'login',
      component: loadView('user/user_sys/login')
    },
    // admin pages
    {
      path: '/admin',
      component: loadView('admin/layout'),
      children: [
        {
          path: '',
          name: 'ad_index',
          component: loadView('admin/index')
        },
        {
          path: 'book',
          name: 'ad_book',
          component: loadView('admin/InAndOut/inputs')
        },
        {
          path: 'user',
          name: 'ad_user',
          component: loadView('admin/warnings/warning_table')
        },
        {
          path: 'order',
          name: 'ad_order',
          component: loadView('admin/InAndOut/outs')
        },
        {
          path: 'data',
          name: 'ad_data',
          component: loadView('admin/monitor/monitor2')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && to.name.substr(0, 2) !== 'ad') {
    const isLogin = Cookies.get('login')
    if (isLogin === 'USER') {
      next()
    } else {
      if (isLogin === 'ADMIN') {
        router.push({name: 'ad_index'})
      } else {
        router.push({name: 'login'})
      }
    }
  } else if (to.name.substr(0, 2) === 'ad') {
    const isLogin = Cookies.get('login')
    if (isLogin === 'ADMIN') {
      next()
    } else {
      router.push({name: 'homepage'})
    }
  } else {
    next()
  }
})

export default router
