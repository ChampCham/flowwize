import Web3 from "web3";
import _ from "lodash";
import CryptoJS from "crypto-js";
import { db, storage } from "../firebase";
import fw from "../fw";

const httpProvider =
  "wss://rinkeby.infura.io/ws/v3/cc3e482b63d0469fb4d4e72c6f2eacd4";

// const httpProvider = "ws://127.0.0.1:7545";
//Fronk
const contractAddr = "0x03b21eF1A36EE65CD10E5532CcB938D4451bAE0f";
//Champ
// const contractAddr = "0x990D40437cC7FCAB6C19c6eEe8B7Ef9D2f9bC742";

const contractAbi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "loanRequestID",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "idx",
        type: "uint256"
      }
    ],
    name: "accept",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "cancelDocumentRequest",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "cancelRequest",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256"
      }
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256"
      }
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "payFee",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "bank",
        type: "address"
      }
    ],
    name: "registerBank",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "requester",
        type: "address"
      }
    ],
    name: "registerRequester",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "loanRequestID",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "idx",
        type: "uint256"
      }
    ],
    name: "reject",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "LRid",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "requesting",
        type: "string"
      },
      {
        internalType: "string",
        name: "bankName",
        type: "string"
      }
    ],
    name: "requestDocument",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "loanType",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "requestLoan",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "docRequestId",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "links",
        type: "string"
      }
    ],
    name: "transferDocs",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "Accept",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "Reject",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "docRequestId",
        type: "uint256"
      }
    ],
    name: "GrantDocumentsAccess",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "bank",
        type: "address"
      }
    ],
    name: "RegisterBank",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "bank",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "bankName",
        type: "string"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "docRequestId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "LRid",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "string",
        name: "requesting",
        type: "string"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    name: "RequestDocument",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "bank",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "bankName",
        type: "string"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "docRequestId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "LRid",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "string",
        name: "requesting",
        type: "string"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    name: "CancelDocumentRequest",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address"
      }
    ],
    name: "RegisterRequester",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "string",
        name: "loanType",
        type: "string"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "RequestLoan",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "string",
        name: "loanType",
        type: "string"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "CancelRequest",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "bankRequestAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "bool",
        name: "",
        type: "bool"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "LRId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "idx",
        type: "uint256"
      }
    ],
    name: "getDocumentsByLRId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "bool",
        name: "",
        type: "bool"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "LRId",
        type: "uint256"
      }
    ],
    name: "getDocumentsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "minter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "myBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "myBankRequestAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "bool",
        name: "",
        type: "bool"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "myRequestAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "",
        type: "bool"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "numOfAllBankRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "numOfAllRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "numOfMyBankRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "numOfMyRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "requestAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "",
        type: "bool"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

const gasLimit = "600000";
const web3 = new Web3(new Web3.providers.WebsocketProvider(httpProvider));
web3.eth.net.getId().then(console.log);
const contract = new web3.eth.Contract(contractAbi, contractAddr);
contract.events.Accept().on("data", data => {
  const id = parseInt(data.returnValues.id);
  bankRequestAt(id).then(dreq => {
    const documents = JSON.parse(dreq[3]);
    db.collection("users")
      .where("wallet.address", "==", dreq[1])
      .get()
      .then(ddocs => {
        _.forEach(ddocs.docs, dd => {
          requestAt(dreq[2]).then(lreq => {
            db.collection("users")
              .where("wallet.address", "==", lreq[1])
              .get()
              .then(doc => {
                const promises = [];
                const links = {};
                _.forEach(doc.docs, d => {
                  const ref = storage.ref(d.id);
                  Object.keys(documents).forEach(key => {
                    const link = ref
                      .child(`${documents[key].name}.pdf`)
                      .getDownloadURL();
                    promises.push(link);
                    link
                      .then(url => {
                        links[documents[key].label] = url;
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  });
                  Promise.all(promises).then(() => {
                    transferDocs(
                      dd.data().wallet,
                      dreq[0],
                      JSON.stringify(links)
                    );
                  });
                });
              });
          });
        });
      });
  });
});

export const createWallet = () => {
  const { address, privateKey } = web3.eth.accounts.create();
  return { newAddr: address, newPK: privateKey };
};

const signAndSendTransaction = (account, transaction) => {
  return account
    .signTransaction(transaction)
    .then(function(results) {
      if ("rawTransaction" in results) {
        return web3.eth
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
};

export const sendEther = (source, target, amount, key) => {
  const account = web3.eth.accounts.privateKeyToAccount(key);
  if (account.address !== source) {
    console.error("Key mismatch!");
    return;
  } else {
    return signAndSendTransaction(account, {
      from: source,
      to: target,
      value: web3.utils.toWei(amount, "ether"),
      gas: gasLimit
    });
  }
};

export const myBalance = wallet => {
  return contract.methods.myBalance().call({ from: wallet.address });
};

export const registerRequester = wallet => {
  const account = web3.eth.accounts.privateKeyToAccount(fw.privateKey);
  const encodedABI = contract.methods
    .registerRequester(wallet.address)
    .encodeABI();
  return signAndSendTransaction(account, {
    from: fw.address,
    to: contractAddr,
    gas: gasLimit,
    data: encodedABI
  });
};

export const registerBank = wallet => {
  const account = web3.eth.accounts.privateKeyToAccount(fw.privateKey);
  const encodedABI = contract.methods.registerBank(wallet.address).encodeABI();
  return signAndSendTransaction(account, {
    from: fw.address,
    to: contractAddr,
    gas: gasLimit,
    data: encodedABI
  });
};

export const requestLoan = (wallet, loanType, amount) => {
  const account = web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
  const encodedABI = contract.methods.requestLoan(loanType, amount).encodeABI();
  return signAndSendTransaction(account, {
    from: wallet.address,
    to: contractAddr,
    gas: gasLimit,
    data: encodedABI
  });
};

export const requestDocument = (
  wallet,
  loanReqId,
  requestingDocs,
  bankName
) => {
  const account = web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
  const encodedABI = contract.methods
    .requestDocument(loanReqId, requestingDocs, bankName)
    .encodeABI();
  return signAndSendTransaction(account, {
    from: wallet.address,
    to: contractAddr,
    gas: gasLimit,
    data: encodedABI
  });
};

export const cancelRequest = (wallet, id) => {
  const account = web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
  const encodedABI = contract.methods.cancelRequest(id).encodeABI();
  return signAndSendTransaction(account, {
    from: wallet.address,
    to: contractAddr,
    gas: gasLimit,
    data: encodedABI
  });
};

export const cancelDocumentRequest = (wallet, id) => {
  const account = web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
  const encodedABI = contract.methods.cancelDocumentRequest(id).encodeABI();
  return signAndSendTransaction(account, {
    from: wallet.address,
    to: contractAddr,
    gas: gasLimit,
    data: encodedABI
  });
};

export const numOfMyRequests = wallet => {
  return contract.methods.numOfMyRequests().call({ from: wallet.address });
};

export const numOfMyBankRequests = wallet => {
  return contract.methods.numOfMyBankRequests().call({ from: wallet.address });
};

export const numOfAllRequests = () => {
  return contract.methods.numOfAllRequests().call();
};

export const numOfAllBankRequests = () => {
  return contract.methods.numOfAllBankRequests().call();
};

export const myRequestAt = (wallet, id) => {
  return contract.methods.myRequestAt(id).call({ from: wallet.address });
};

export const myBankRequestAt = (wallet, id) => {
  return contract.methods.myBankRequestAt(id).call({ from: wallet.address });
};

export const requestAt = id => {
  return contract.methods.requestAt(id).call();
};

export const bankRequestAt = id => {
  return contract.methods.bankRequestAt(id).call();
};

export const getDocumentsByLoanReqId = (wallet, loanReqId, id) => {
  return contract.methods
    .getDocumentsByLRId(loanReqId, id)
    .call({ from: wallet.address });
};

export const getDocumentsLength = (wallet, loanReqId) => {
  return contract.methods
    .getDocumentsLength(loanReqId)
    .call({ from: wallet.address });
};

export const acceptDocReq = (wallet, loanReqId, id) => {
  const account = web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
  const encodedABI = contract.methods.accept(loanReqId, id).encodeABI();
  return signAndSendTransaction(account, {
    from: wallet.address,
    to: contractAddr,
    gas: gasLimit,
    data: encodedABI
  });
};

export const rejectDocReq = (wallet, loanReqId, id) => {
  const account = web3.eth.accounts.privateKeyToAccount(wallet.privateKey);
  const encodedABI = contract.methods.reject(loanReqId, id).encodeABI();
  return signAndSendTransaction(account, {
    from: wallet.address,
    to: contractAddr,
    gas: gasLimit,
    data: encodedABI
  });
};

const transferDocs = (wallet, dReqId, links) => {
  const account = web3.eth.accounts.privateKeyToAccount(fw.privateKey);
  const encrypted = CryptoJS.AES.encrypt(links, wallet.privateKey).toString();
  const encodedABI = contract.methods
    .transferDocs(dReqId, encrypted)
    .encodeABI();
  return signAndSendTransaction(account, {
    from: wallet.address,
    to: contractAddr,
    gas: gasLimit,
    data: encodedABI
  });
};
