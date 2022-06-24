import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../components/pages/Dashboard.vue";
import Login from "../components/pages/Login.vue";
import Products from "../components/pages/Products";
import Orders from "../components/pages/Orders";
import Coupons from "../components/pages/Coupons";
import Userboard from "../components/pages/Userboard";
import Usercart from "../components/pages/Usercart"
import Userproduct from "../components/pages/Userproduct"

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
  {
    path: "/user",
    name: "Userboard",
    component: Userboard,
    children: [
      {
        path: "cart",
        name: "Cart",
        component: Usercart,
      },
      {
        path: "product/:productId",
        name: "UserProduct",
        component: Userproduct,
      },
    ]

  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
});

export default router;
