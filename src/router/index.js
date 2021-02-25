import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('@/components/index.vue') },
  { path: '/index', redirect: '/' },
  { path: '/login', component: () => import('@/components/login.vue') },
  { path: '/register', component: () => import('@/components/register.vue') },
  {
    path: '/not',
    component: () => import('@/components/notlogged/notlogged.vue'),
    children: [
      { path: 'information', component: () => import('@/components/notlogged/notinformation.vue') },
      { path: 'trade', component: () => import('@/components/notlogged/nottrade.vue') },
      { path: 'news/:id', component: () => import('@/components/notlogged/notinfoDetail.vue') }
    ]
  },
  {
    path: '/trade',
    component: () => import('@/components/trade.vue'),
    children: [
      { path: '', component: () => import('@/components/trade/sell.vue') },
      { path: 'purchase', component: () => import('@/components/trade/purchase.vue') },
      { path: 'quote', component: () => import('@/components/trade/quote.vue') },
      { path: 'apply', component: () => import('@/components/trade/apply.vue') },
      { path: 'logistics', component: () => import('@/components/trade/logistics.vue') },
      { path: 'search', component: () => import('@/components/trade/search.vue') },
      { path: 'purchasedetail/:id', component: () => import('@/components/trade/purchaseDetail.vue') },
      { path: 'selldetail/:id', component: () => import('@/components/trade/selldetail.vue') }
    ]
  },
  {
    path: '/member',
    component: () => import('@/components/member.vue'),
    children: [
      { path: '', component: () => import('@/components/member/order.vue') },
      { path: '1', component: () => import('@/components/member/detailDeposit.vue') },
      { path: '2', component: () => import('@/components/member/prestoreDeposit.vue') },
      { path: '3', component: () => import('@/components/member/unlock.vue') },
      { path: 'selfpage', component: () => import('@/components/member/selfpage.vue') },
      { path: 'account', component: () => import('@/components/member/account.vue') }
    ]
  },
  {
    path: '/information',
    component: () => import('@/components/information.vue'),
    children: [
      { path: '', component: () => import('@/components/infor/daily.vue') },
      { path: 'internal', component: () => import('@/components/infor/internal.vue') },
      { path: 'international', component: () => import('@/components/infor/international.vue') },
      { path: 'news/:id', component: () => import('@/components/infor/newsdetail.vue') }
    ]
  },
  { path: '*', component: () => import('@/components/404.vue') }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  if (to.path === '/' || to.path === '/login' || to.path === '/register' || to.path === '/not/trade' || to.path === '/not/information' || to.path === '/not/news/1' || to.path === '/not/news/2' || to.path === '/not/news/3' || to.path === '/not/news/4') {
    return next()
  }
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
