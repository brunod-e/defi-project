import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { getDaiToken, getBDEToken } from "./services/loadContracts";

const App = () => {
  const [account, setAccount] = useState("");
  const [daiToken, setDaiToken] = useState({});
  const [bdeToken, setBdeToken] = useState({});
  const [tokenFarm, setTokenFarm] = useState({});
  const [daiTokenBalance, setDaiTokenBalance] = useState("0");
  const [bdeTokenBalance, setBdeTokenBalance] = useState("0");
  const [stakingBalance, setStakingBalance] = useState("0");
  const [loading, setLoading] = useState(true);

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const [newAccount] = await web3.eth.getAccounts();
    setAccount(newAccount);

    const networkId = await web3.eth.net.getId();

    // Load DaiToken
    const { daiTokenValue, daiTokenBalanceValue } = await getDaiToken(
      web3,
      newAccount,
      networkId
    );

    setDaiToken(daiTokenValue);
    setDaiTokenBalance(daiTokenBalanceValue);

    // Load BDE Token
    const { bdeTokenValue, bdeTokenBalanceValue } = await getBDEToken(
      web3,
      newAccount,
      networkId
    );

    setBdeToken(bdeTokenValue);
    setBdeTokenBalance(bdeTokenBalanceValue);
  };

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  return <div></div>;
};

export default App;
