import { fb, db } from "@/firebase";
import {
  sendEther,
  createWallet,
  registerRequester
} from "../../plugins/getWeb3";
import fw from "../../fw";

export default {
  state: {
    users: null,
    user: null
  },
  getters: {
    users: state => {
      return state.users;
    },
    // currentUserUid: state => {
    //     return state.currentUserUid
    // },
    user: state => {
      return state.user;
    }
  },
  mutations: {
    // setUsers: (state, payload) => {
    //     state.user-management = payload
    // },
    setUser: (state, payload) => {
      console.log(payload);
      state.user = payload;
    }
    // setCurrentUserUid: (state, payload) => {
    //     state.currentUserUid = payload
    // },
    // addUser: (state, payload) => {
    //     let user = state.user-management.find(user => user.id === payload.id)
    //     if (user) {
    //         user = payload
    //     } else {
    //         state.user-management.push(payload)
    //     }
    // },
    // ...vuexfireMutations
  },
  actions: {
    async logIn({ commit }, payload) {
      console.log(payload);
      commit("setLoading", true);
      commit("clearError");
      await fb
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(({ user }) => {
          db.collection("users")
            .doc(user.uid)
            .get()
            .then(snapshot => {
              commit("setLoading", false);
              commit("setUser", snapshot.data());
            })
            .catch(error => {
              commit("setLoading", false);
              commit("setError", error);
              console.log(error);
            });
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    async signUp({ commit }, payload) {
      console.log(payload);
      commit("setLoading", true);
      commit("clearError");
      await fb
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(async ({ user }) => {
          const { newAddr, newPK } = createWallet();
          const newUser = {
            username: payload.username,
            role: payload.role,
            wallet: {
              address: newAddr,
              privateKey: newPK
            }
          };
          await db
            .collection("users")
            .doc(user.uid)
            .set(newUser)
            .then(() => {
              sendEther(fw.address, newUser.wallet.address, "1", fw.privateKey);
            })
            .then(() => {
              registerRequester(newUser.wallet.address);
            });
          commit("setUser", newUser);
          commit("setLoading", false);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    async logOut({ commit }) {
      await fb.auth().signOut();
      commit("setUser", null);
    },
    autoSignIn({ commit }, payload) {
      const newUser = {
        id: payload.uid,
        username: "default"
      };
      commit("setUser", newUser);
    },
    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      commit("clearError");
      const docRef = db.collection("users").doc(getters.user.id);

      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            const user = doc.data();
            commit("setUser", user);
          } else {
            console.log("No such document!");
          }
          commit("setLoading", false);
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
          commit("setError", error);
          commit("setLoading", false);
        });
    }
  }
};
