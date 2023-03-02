const { setUpWeb3,  setUpOracle, setUpStaking } = require("../interface")
const interaction = require("../interaction");
module.exports = async () => {
    const web3 = setUpWeb3(process.env.RPC);
    const oracle = setUpOracle(web3,process.env.ORACLEADDR);
    const staking = setUpStaking(web3,process.env.STAKINGADDR);

    oracle.events.Invoke({},async (e) => {
        const amount = e.returnValues.amount;
        const user = e.returnValues.user;
        //if the check is passed reward is sent
        let infos = await staking.methods.stakeInfos(user).call;
        if(infos.amount >= amount) {
            await interaction(amount);
        }
        console.log(e);
    })
}