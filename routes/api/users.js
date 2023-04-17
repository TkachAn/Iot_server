const express = require("express");
const router = express.Router();
const {v4: uuidv4} = require("uuid");
// console.log("uuidv4(4): ", uuidv4());
const db = require("../../db/db.json");
// console.log("db.devices: ", db.devices);
const users = db.users;

router.get("/", (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      users,
    },
  });
});

router.get("/:id", (req, res, next) => {
  const {id} = req.params;
  const [user] = users.filter((el) => el.id === id);
  res.json({
    status: "success",
    code: 200,
    data: user,
  });
});

router.post("/", (req, res, next) => {
  const {title, text} = req.body;
  // console.log("title: ", title);
  const user = {
    id: uuidv4(),
    nic,
    email,
    done: false,
  };
  console.log("user: ", user);
  users.push(user);
  res.status(201).json({
    status: "success",
    code: 201,
    data: user,
  });
});
router.put("/:id", (req, res, next) => {
  const {id} = req.params;
  const {nic, email} = req.body;
  const [user] = users.filter((el) => el.id === id);
  user.nic = nic;
  user.email = email;
  res.json({
    status: "success",
    code: 200,
    data: user,
  });
});
router.patch("/:id/status", (req, res, next) => {
  const {id} = req.params;
  const {done} = req.body;
  const [user] = users.filter((el) => el.id === id);
  user.done = done;
  res.json({
    status: "success",
    code: 200,
    data: user,
  });
});
router.delete("/:id", (req, res, next) => {
  const {id} = req.params;
  const newusers = users.filter((el) => el.id !== id);
  users = [...newusers];
  res.status(204).json();
});

module.exports = router;
