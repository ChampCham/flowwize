import { fb, db } from "@/firebase";
import firebase from "firebase";
import Web3 from "web3";
import fw from "../../fw";

const httpProvider =
  "https://rinkeby.infura.io/v3/230cd6eacddf44d6b6307c70164a1636";

function createWallet() {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const { address, privateKey } = web3.eth.accounts.create();
    console.log(`address: ${address}, privateKey: ${privateKey}`);
    return { newAddr: address, newPK: privateKey };
  } else {
    console.error("cannot find web3");
    return null;
  }
}
function signAndSendTransaction(web3, account, transaction) {
  return account
    .signTransaction(transaction)
    .then(function(results) {
      console.log(results);
      if ("rawTransaction" in results) {
        web3.eth
          .sendSignedTransaction(results.rawTransaction)
          .then(receipt => {
            console.log(receipt);
          })
          .catch(console.error);
      } else {
        console.error("Cannot find rawTransaction in results");
      }
    })
    .catch(console.error);
}

function sendEther(source, target, amount, key) {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    console.log(
      `source: ${source} target: ${target} amount: ${amount} key: ${key}`
    );
    const account = web3.eth.accounts.privateKeyToAccount(key);
    console.log(account);
    if (account.address !== source) {
      console.error("Key mismatch!");
    } else {
      console.log(`sign`);
      signAndSendTransaction(web3, account, {
        from: source,
        to: target,
        value: web3.utils.toWei(amount, "ether"),
        gas: "30000"
      });
    }
  } else {
    console.error("cannot find web3");
  }
}

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
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid
          };
          commit("setUser", newUser);
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
              sendEther(
                fw.address,
                newUser.wallet.address,
                "0.01",
                fw.privateKey
              );
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
