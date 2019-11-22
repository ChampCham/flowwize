import Vue from "vue";
import VueRouter from "vue-router";
import { fb, db } from "@/firebase";
import _ from "lodash";
const Login = () => import("@/views/Login");
const Signup = () => import("@/views/Signup");
const Header = () => import("@/components/Header");
const LoanRequest = () => import("@/views/LoanRequest");
const Requests = () => import("@/views/Requests");
const Offers = () => import("@/views/Offers");
const Upload = () => import("@/views/Upload");
const DocumentRequest = () => import("@/views/DocumentRequest");
const BankLoanRequest = () => import("@/views/BankLoanRequest");
const BankOffer = () => import("@/views/BankOffer");

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
    path: "/signup/:role",
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
    name: "USER",
    component: LoanRequest,
    meta: {
      requiresAuth: true,
      requireRoles: ["USER"]
    }
  },
  {
    path: "/requests",
    name: "USER",
    component: Requests,
    meta: {
      requiresAuth: true,
      requireRoles: ["USER"]
    }
  },
  {
    path: "/offers",
    name: "USER",
    component: Offers,
    meta: {
      requiresAuth: true,
      requireRoles: ["USER"]
    }
  },
  {
    path: "/upload",
    name: "USER",
    component: Upload,
    meta: {
      requiresAuth: true,
      requireRoles: ["USER"]
    }
  },
  {
    path: "/documentRequest",
    name: "BANK",
    component: DocumentRequest,
    meta: {
      requiresAuth: true,
      requireRoles: ["BANK"]
    }
  },
  {
    path: "/bankRequest",
    name: "BANK",
    component: BankLoanRequest,
    meta: {
      requiresAuth: true,
      requireRoles: ["BANK"]
    }
  },
  {
    path: "/bankOffer",
    name: "BANK",
    component: BankOffer,
    meta: {
      requiresAuth: true,
      requireRoles: ["BANK"]
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const auth = to.matched.some(record => record.meta.requiresAuth);
  const guest = to.matched.some(record => record.meta.requiresGuest);
  const requireRoles = to.meta.requireRoles;

  const currentUser = fb.auth().currentUser;
  let currentUserInfo = null;
  if (currentUser === null) {
    if (auth) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then(doc => {
        console.log(currentUserInfo);
        currentUserInfo = doc.data();
        currentUserInfo.role.toUpperCase();
      })
      .catch(error => {
        console.log("Error getting documents: ", error);
      })
      .then(() => {
        if (!currentUserInfo) {
          if (auth) {
            next({ path: "/login" });
          } else {
            next();
          }
        } else {
          const role = currentUserInfo.role.toUpperCase();
          if (auth) {
            if (requireRoles) {
              if (_.indexOf(requireRoles, role) > -1) {
                next();
              } else {
                next({ name: role });
              }
            } else {
              next();
            }
          } else if (guest) {
            next({ name: role });
          } else {
            next();
          }
        }
      });
  }
});
export default router;
