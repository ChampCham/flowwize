import Vue from "vue";
import VueRouter from "vue-router";
import { fb } from "@/firebase";
const Login = () => import("@/views/Login");
const Signup = () => import("@/views/Signup");
const Header = () => import("@/components/Header");
const LoanRequest = () => import("@/views/LoanRequest");
const Requests = () => import("@/views/Requests");
const Offers = () => import("@/views/Offers");
const Upload = () => import("@/views/Upload");
const CreateOffer = () => import("@/views/CreateOffer");

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/header",
    name: "Header",
    component: Header,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/request",
    name: "LoanRequest",
    component: LoanRequest,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/requests",
    name: "Requests",
    component: Requests,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/offers",
    name: "Offers",
    component: Offers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/createOffer",
    name: "CreateOffer",
    component: CreateOffer,
    meta: {
      requiresGuest: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = fb.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  if (requiresAuth) {
    if (!currentUser) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else next();
  } else if (requiresGuest) {
    if (currentUser) {
      next({
        path: "/request",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else next();
});

export default router;
