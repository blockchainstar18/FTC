const express = require("express");
const router = express.Router();

const Account = require("../model/Account");

// router.post("/register", (req, res) => {
//   User.create(req.body)
//     .then(() => res.json({ msg: "User added successfully" }))
//     .catch((err) => res.status(400).json({ error: err }));
// });

// router.post("/login", async (req, res) => {
//   const users = await User.find(req.body);
//   if (users.length) res.json(true);
//   else res.json(false);
// });

router.post("/account", async (req, res) => {
  const user = await Account.find(req.body);

  if (user.length == 0) {
    Account.create(req.body)
      .then((r) => {
        res.json(r);
      })
      .catch((err) => res.status(400).json({ error: err }));
  } else res.json(user[0]);
});

router.post("/checklogin", async (req, res) => {
  const user = await Account.find(req.body);

  if (user.length == 0) {
    res.json(false);
  } else res.json(user[0]);
});

module.exports = router;
