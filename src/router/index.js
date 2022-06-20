import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../components/pages/Dashboard.vue";
import Login from "../components/pages/Login.vue";
import Products from "../components/pages/Products";
import Orders from "../components/pages/Orders"
import Coupons from "../components/pages/Coupons"

const routes = [
  {
    path: "/:pathMatch(.*)",
    redirect: "login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "products",
        name: "Products",
        component: Products,
        meta: { requiresAuth: true },
      },
      {
        path: "orders",
        name: "Orders",
        component: Orders,
        meta: { requiresAuth: true },
      },
      {
        path: "coupons",
        name: "Coupons",
        component: Coupons,
        meta: { requiresAuth: true },
      }
    ],
  },
  // {
  //   path: "/user",
  //   name: "Userboard",
  //   component: Userboard,
  //   children: [
  //     {

  //     }
  //   ]

  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
});

export default router;
