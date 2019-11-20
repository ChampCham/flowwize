import Web3 from "web3";

const httpProvider =
  "https://rinkeby.infura.io/v3/230cd6eacddf44d6b6307c70164a1636";

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
