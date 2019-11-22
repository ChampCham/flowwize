import Web3 from "web3";

// const httpProvider =
//   "https://rinkeby.infura.io/v3/230cd6eacddf44d6b6307c70164a1636";

const httpProvider = "http://127.0.0.1:7545";
const loanRequestContractAddr = "0x36E262F6d9A434922f52dF0B2440F6D5Bd00ADc5";
const loanRequestContractAbi = [
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
        name: "id",
        type: "uint256"
      }
    ],
    name: "requestAt",
    outputs: [
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

export const requestLoan = (address, loanType, amount) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(
      loanRequestContractAbi,
      loanRequestContractAddr
    );
    return contract.methods
      .requestLoan(loanType, amount)
      .send({ from: address, gas: 300000 });
  } else {
    console.error("cannot find web3");
  }
};

export const cancelRequest = (address, id) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(
      loanRequestContractAbi,
      loanRequestContractAddr
    );
    return contract.methods
      .cancelRequest(id)
      .send({ from: address, gas: 300000 });
  } else {
    console.error("cannot find web3");
  }
};

export const registerRequester = address => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(
      loanRequestContractAbi,
      loanRequestContractAddr
    );
    return contract.methods
      .registerRequester()
      .send({ from: address, gas: 300000 });
  } else {
    console.error("cannot find web3");
  }
};

export const numOfMyRequests = address => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(
      loanRequestContractAbi,
      loanRequestContractAddr
    );
    return contract.methods.numOfMyRequests().call({ from: address });
  } else {
    console.error("cannot find web3");
  }
};

export const numOfAllRequests = () => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(
      loanRequestContractAbi,
      loanRequestContractAddr
    );
    return contract.methods.numOfAllRequests().call();
  } else {
    console.error("cannot find web3");
  }
};

export const myRequestAt = (address, id) => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(
      loanRequestContractAbi,
      loanRequestContractAddr
    );
    return contract.methods.myRequestAt(id).call({ from: address });
  } else {
    console.error("cannot find web3");
  }
};

export const requestAt = id => {
  if (Web3) {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const contract = new web3.eth.Contract(
      loanRequestContractAbi,
      loanRequestContractAddr
    );
    return contract.methods.requestAt(id).call();
  } else {
    console.error("cannot find web3");
  }
};
