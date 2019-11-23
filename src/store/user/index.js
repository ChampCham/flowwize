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

    user: state => {
      return state.user;
    }
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload;
    }
  },
  actions: {
    async logIn({ commit }, payload) {
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
              const user = snapshot.data();
              if (user.role !== payload.roleCheck) {
                fb.auth()
                  .signOut()
                  .then(() => {
                    commit("setLoading", false);
                    commit("setUser", null);
                    commit("setError", {
                      message:
                        "There is no user record corresponding to this identifier. The user may in another role."
                    });
                  });
              } else {
                commit("setLoading", false);
                commit("setUser", user);
              }
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
      commit("setLoading", true);
      commit("clearError");
      await fb
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(async ({ user }) => {
          const { newAddr, newPK } = createWallet();
          const newUser = {
            fullname: payload.fullname,
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
        fullname: "default"
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
