const router = require("express").Router();
const User = require("../model/User");

router.post("/register", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  User.findOne({ email: user.email })
    .then((result) => {
      result
        ? res.send("An account with this email already exists.")
        : user
            .save()
            .then((result) => res.json(result))
            .catch((error) => res.status(400).send(error));
    })
    .catch((err) => res.send(err));
});

router.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password,
  })
    .then((result) => res.json(result))
    .catch((err) => res.status(401).send(err));
});

module.exports = router;
