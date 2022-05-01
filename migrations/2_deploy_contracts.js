const BDEToken = artifacts.require("BDEToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network,  accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()
  
  // Deploy BDE Token
  await deployer.deploy(BDEToken)
  const bdeToken = await BDEToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm, bdeToken.address, daiToken.address)
  const tokenFarm = await TokenFarm.deployed()

  // Transfer all tokens to TokenFarm
  await bdeToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], '100000000000000000000')
}