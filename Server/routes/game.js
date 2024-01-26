const express = require("express");
const router = express.Router();

const Account = require("../model/Account");
const Chests = require("../model/Chests");

router.post("/play", async (req, res) => {
  let filling = true;
  const chest = await Chests.findOne();
  const player = await Account.findOne({ account: req.body.account });
  if (!chest) await Chests.create({});
  else {
    if (req.body.size == 10) {
      if (player.balances[req.body.chest] < req.body.amount) {
        res.json(false);
        return;
      }
      player.balances[req.body.chest] -= req.body.amount;
      chest["chests"][req.body.chest]["small"] += req.body.amount;

      if (chest["chests"][req.body.chest]["small"] >= 10) {
        player.balances[req.body.chest] += 9;
        chest["chests"][req.body.chest]["small"] = 0;
        filling = false;
      }
    }

    if (req.body.size == 50) {
      if (player.balances[req.body.chest] < req.body.amount) {
        res.json(false);
        return;
      }
      player.balances[req.body.chest] -= req.body.amount;
      chest["chests"][req.body.chest]["medium"] += req.body.amount;

      if (chest["chests"][req.body.chest]["medium"] >= 50) {
        player.balances[req.body.chest] += 45;
        chest["chests"][req.body.chest]["medium"] = 0;
        filling = false;
      }
    }
    if (req.body.size == 100) {
      if (player.balances[req.body.chest] < req.body.amount) {
        res.json(false);
        return;
      }
      player.balances[req.body.chest] -= req.body.amount;
      chest["chests"][req.body.chest]["big"] += req.body.amount;

      if (chest["chests"][req.body.chest]["big"] >= 100) {
        player.balances[req.body.chest] += 90;
        chest["chests"][req.body.chest]["big"] = 0;
        filling = false;
      }
    }
    await player.save();
    await chest.save();
  }
  res.json({ player: player, filling: filling });
});

module.exports = router;

// const Web3 = require('web3');
// const web3 = new Web3('https://mainnet.infura.io/v3/your_infura_project_id');
// const tokenContractAddress = '0x123...'; // Replace with the ERC20 token contract address
// const walletAddress = '0x456...'; // Replace with the specific wallet address to monitor

// const tokenContract = new web3.eth.Contract(ERC20ABI, tokenContractAddress);

// tokenContract.events.Transfer({ to: walletAddress })
//   .on('data', (event) => {
//     // Handle the Transfer event
//     console.log('ERC20 tokens received:', event.returnValues.value);
//   })
//   .on('error', console.error);
