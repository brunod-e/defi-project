import DaiToken from "../abis/DaiToken.json";
import BDEToken from "../abis/BDEToken.json";

const getDaiToken = async (web3, account, networkId) => {
  const daiTokenData = DaiToken.networks[networkId];

  if (daiTokenData) {
    const daiTokenValue = new web3.eth.Contract(
      DaiToken.abi,
      daiTokenData.address
    );

    let daiTokenBalance = await daiTokenValue.methods.balanceOf(account).call();

    return {
      daiTokenValue: daiTokenValue,
      daiTokenBalanceValue: daiTokenBalance.toString(),
    };
  } else {
    window.alert("Dai Token contract not deployed to detected network.");
  }
};

const getBDEToken = async (web3, account, networkId) => {
  const bdeTokenData = BDEToken.networks[networkId];

  if (bdeTokenData) {
    const bdeTokenValue = new web3.eth.Contract(
      BDEToken.abi,
      bdeTokenData.address
    );

    let bdeTokenBalance = await bdeTokenValue.methods.balanceOf(account).call();

    return {
      bdeTokenValue: bdeTokenValue,
      bdeTokenBalanceValue: bdeTokenBalance.toString(),
    };
  } else {
    window.alert("Dai Token contract not deployed to detected network.");
  }
};

export { getDaiToken, getBDEToken };
