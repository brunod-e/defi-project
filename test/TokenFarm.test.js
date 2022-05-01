const { assert } = require('chai');

const BDEToken = artifacts.require("BDEToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

require('chai')
    .use(require('chai-as-promised'))
    .should()

const formatTokensQuantity = (tokensQuantity) => web3.utils.toWei(tokensQuantity, 'ether')

contract('TokenFarm', ([owner, investor]) => {

    let daiToken, bdeToken, tokenFarm

    before(async () => {

        // Load Contracts
        daiToken = await DaiToken.new()
        bdeToken = await BDEToken.new()
        tokenFarm = await TokenFarm.new(bdeToken.address, daiToken.address)

        // Transfer all BDE Tokens to farm
        await bdeToken.transfer(tokenFarm.address, formatTokensQuantity('1000000'))

        // Send tokens to investor
        await daiToken.transfer(investor, formatTokensQuantity('100'), { from: owner} )
    })

    describe('Mock DAI deployment', async () => {
        it('has a name', async () =>  {
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('BDE Token deployment', async () => {
        it('has a name', async () =>  {
            const name = await bdeToken.name()
            assert.equal(name, 'BDE Token')
        })
    })
    
    describe('Token Farm deployment', async () => {
        it('has a name', async () =>  {
            const name = await tokenFarm.name()
            assert.equal(name, 'BDE Token Farm')
        })

        it('contract has tokens', async () => {
            let balance = await bdeToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), formatTokensQuantity('1000000'))
        })        
    })

    describe('Farming tokens', async () => {
        it('rewards investors', async () =>  {
            let result

            // Check investor balance before staking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), formatTokensQuantity('100'), 'Investor Mock DAI wallet balance correct before staking')

            // Stake Mock DAI Tokens
            await daiToken.approve(tokenFarm.address, formatTokensQuantity('100'), { from: investor })
            await tokenFarm.stakeTokens(formatTokensQuantity('100'), { from: investor })

            // Check stake result
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), formatTokensQuantity('0'), 'Investor Mock DAI wallet balance correct after staking')
            
            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), formatTokensQuantity('100'), 'Token Farm Mock DAI wallet balance correct after staking')

            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), formatTokensQuantity('100'), 'Investor stake balance correct after staking')

            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'true', 'Investor staking status correct after staking')
        })
    })
})