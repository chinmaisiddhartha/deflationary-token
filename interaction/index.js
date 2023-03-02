const Web3 = require('web3');
const { setUpStaking } = require('../interface');
const OracleABI = require('../build/contracts/Oracle.json').abi;
const StakingABI = require('../build/contracts/Oracle.json').abi;


const main = async (amount) => {
        let abi
        let web3 = new Web3(process.env.HTTPRPC)
        let privKey = process.env.PRIVATE
        const account=await web3.eth.accounts.privateKeyToAccount(privKey)
        let nonce = await web3.eth.getTransactionCount(account.address, 'latest');
        let contract = await new web3.eth.Contract(OracleABI, process.env.ORACLEADDR);
        let stakingContract = setUpStaking(web3, process.env.STAKINGADDR);
        let txHash;
        const gas = 300000;
        const gasLimit = 3000000;
        nonce = await web3.eth.getTransactionCount(account.address, 'latest');
        let tx={
            nonce,
            from: account.address,
            to: OneVSOne.address,
            data: contract.methods.run(stakingContract.methods.sendRewards(amount).encodeABI()).encodeABI(),
            gas,
            gasLimit
        }
        let signedTx =await web3.eth.accounts.signTransaction(tx, privKey);
        txHash=await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

}

module.exports = main