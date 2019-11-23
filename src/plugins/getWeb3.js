import Web3 from "web3";

// const httpProvider =
//   "https://rinkeby.infura.io/v3/230cd6eacddf44d6b6307c70164a1636";

const httpProvider = "http://127.0.0.1:7545";
const contractAddr = "0x90a3a4f99b842149E438BEd2bA94E09d486773Fe";
// const contractAddr = "0xc94929a02Cc197a65AA3D0B31eb9a530Fa534bD4";
const contractAbi = [
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
    constant: false,
    inputs: [],
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
      }
    ],
    payable: false,
    stateMutability: "view",
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
    constant: false,
    inputs: [],
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
  }
];

export const createWallet = () => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const { address, privateKey } = web3.eth.accounts.create();
    console.log(`address: ${address}, privateKey: ${privateKey}`);
    return { newAddr: address, newPK: privateKey };
  } else {
    console.error("cannot find web3");
    return null;
  }
};

const signAndSendTransaction = (web3, account, transaction) => {
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
};

export const sendEther = (source, target, amount, key) => {
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
};

export const registerRequester = address => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods
      .registerRequester()
      .send({ from: address, gas: 300000 });
  } else {
    console.error("cannot find web3");
  }
};

export const registerBank = address => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods.registerBank().send({ from: address, gas: 300000 });
  } else {
    console.error("cannot find web3");
  }
};

export const requestLoan = (address, loanType, amount) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods
      .requestLoan(loanType, amount)
      .send({ from: address, gas: 300000 });
  } else {
    console.error("cannot find web3");
  }
};

export const requestDocument = (
  address,
  loanReqId,
  requestingDocs,
  bankName
) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods
      .requestDocument(loanReqId, requestingDocs, bankName)
      .send({ from: address, gas: 300000 });
  } else {
    console.error("cannot find web3");
  }
};

export const cancelRequest = (address, id) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods
      .cancelRequest(id)
      .send({ from: address, gas: 300000 });
  } else {
    console.error("cannot find web3");
  }
};

export const cancelDocumentRequest = (address, id) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods
      .cancelDocumentRequest(id)
      .send({ from: address, gas: 300000 });
  } else {
    console.error("cannot find web3");
  }
};

export const numOfMyRequests = address => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods.numOfMyRequests().call({ from: address });
  } else {
    console.error("cannot find web3");
  }
};

export const numOfMyBankRequests = address => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods.numOfMyBankRequests().call({ from: address });
  } else {
    console.error("cannot find web3");
  }
};

export const numOfAllRequests = () => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods.numOfAllRequests().call();
  } else {
    console.error("cannot find web3");
  }
};

export const numOfAllBankRequests = () => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods.numOfAllBankRequests().call();
  } else {
    console.error("cannot find web3");
  }
};

export const myRequestAt = (address, id) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods.myRequestAt(id).call({ from: address });
  } else {
    console.error("cannot find web3");
  }
};

export const myBankRequestAt = (address, id) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods.myBankRequestAt(id).call({ from: address });
  } else {
    console.error("cannot find web3");
  }
};

export const requestAt = id => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods.requestAt(id).call();
  } else {
    console.error("cannot find web3");
  }
};

export const bankRequestAt = id => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods.bankRequestAt(id).call();
  } else {
    console.error("cannot find web3");
  }
};

export const getDocumentByLoanReqId = (loanReqId, id) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods.getDocumentByLRId(loanReqId, id).call();
  } else {
    console.error("cannot find web3");
  }
};

export const getDocumentLength = loanReqId => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods.getDocumentLength(loanReqId).call();
  } else {
    console.error("cannot find web3");
  }
};

export const acceptDocReq = (address, loanReqId, id) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods
      .accept(loanReqId, id)
      .send({ from: address, gas: 300000 });
  } else {
    console.error("cannot find web3");
  }
};

export const rejectDocReq = (address, loanReqId, id) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(contractAbi, contractAddr);
    return contract.methods
      .reject(loanReqId, id)
      .send({ from: address, gas: 300000 });
  } else {
    console.error("cannot find web3");
  }
};
