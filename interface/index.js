const Web3 = require('web3');
const {OracleABI} = require('../build/contracts/Oracle.json').abi;

exports.setUpWeb3 = (rpc) => {
    return new Web3(rpc);
}

exports.setUpOracle = (web3, address) => {
    return new web3.eth.Contract(OracleABI, address);
}

exports.setUpStaking = (web3, address) => {
    return new web3.eth.Contract(OracleABI, address);
}