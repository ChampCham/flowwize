import { fb, db } from "@/firebase";
import firebase from "firebase";
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
          fb.firestore()
            .collection("users")
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
    async signUserInWithGoogle({ commit }) {
      commit("setLoading", true);
      commit("clearError");
      const provider = new firebase.auth.GoogleAuthProvider();
      await fb
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          const uid = result.user.uid;
          db.collection("users")
            .doc(uid)
            .get()
            .then(data => {
              if (data.exists === false) {
                db.collection("users")
                  .doc(uid)
                  .set({
                    fullName: result.user.displayName,
                    email: result.user.email,
                    imageUrl: result.user.photoURL,
                    role: "USER",
                    isManager: false,
                    notifications: []
                  });
              } else {
                db.collection("users")
                  .doc(uid)
                  .update({
                    fullName: result.user.displayName,
                    email: result.user.email,
                    imageUrl: result.user.photoURL
                  });
              }
            });
          commit("setLoading", false);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          //console.log(error)
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
            wallet: {
              address: newAddr,
              privateKey: newPK
            }
          };
          await fb
            .firestore()
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
    async logOut() {
      //commit('setCurrentUser', null);
      await fb.auth().signOut();
      //commit('setUser', null)
    }
  }
};
