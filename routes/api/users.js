const express = require("express");
const router = express.Router();
const {connectToDb, getDb} = require("../../db");
const { v4: uuidv4 } = require("uuid");
const { nanoid } = require('nanoid');
const { ObjectId } = require("mongodb");
// console.log("uuidv4(4): ", uuidv4());
// const db = require("../../db");
// // console.log("db.devices: ", db.devices);
// const users = db.users;
let uid = 1;
let db;
//
connectToDb((err) => {
  if (!err) {
    console.log("ok: ");
    db = getDb();
  } else {
    console.log("DB connection ERROR: ", err);
  }
});
//
router.get("/", (req, res, next) => {
  const users = [];
  db.collection("owners")
    .find()
    .forEach((i) => {
      users.push(i);
    })
    .then(() => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({error: "500"});
    });
});
  router.get("/:id", (req, res) => {
    // const {id} = req.params;
		
		const id = req.params.id;
		if (ObjectId.isValid(id)) {
      // console.log("req.params.id: ", id);
      db.collection("owners")
        .findOne({_id: new ObjectId(id)})
        .then((doc) => {
          res.status(200).json(doc);
        })
        .catch(() => {
          res.status(500).json({error: "Something goes wrong..."});
        });
		} else {
			res.status(500).json({error: "Something goes wrong..."});
		}

  });

router.post("/", (req, res) => {
	uid=nanoid(5);
	console.log("uid: ", uid);
	console.log("req.body: ", req.body);
	const {nic, email} = req.body;
    db.collection("owners")
      .insertOne({
        id: uid,
        nic,
        email,
      })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch(() => {
        res.status(500).json({error: "Something goes wrong..."});
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

  router.delete("/:id", (req, res, next) => {
    const {id} = req.params;
    const newusers = users.filter((el) => el.id !== id);
    users = [...newusers];
    res.status(204).json();
  });

  module.exports = router;

  // router.get("/:id", (req, res, next) => {
  //   const {id} = req.params;
  //   const [user] = users.filter((el) => el.id === id);
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: user,
  //   });
  // });
  // router.delete("/:id", (req, res, next) => {
  //   const {id} = req.params;
  //   const newusers = users.filter((el) => el.id !== id);
  //   users = [...newusers];
  //   res.status(204).json();
  // });
  // router.patch("/:id/status", (req, res, next) => {
  //   const {id} = req.params;
  //   const {done} = req.body;
  //   const [user] = users.filter((el) => el.id === id);
  //   user.done = done;
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: user,
  //   });
  // });
  // router.put("/:id", (req, res, next) => {
  //   const {id} = req.params;
  //   const {nic, email} = req.body;
  //   const [user] = users.filter((el) => el.id === id);
  //   user.nic = nic;
  //   user.email = email;
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: user,
  //   });
  // });

  // router.post("/", (req, res, next) => {
  //   const {title, text} = req.body;
  //   // console.log("title: ", title);
  //   const user = {
  //     id: uuidv4(),
  //     nic,
  //     email,
  //     done: false,
  //   };
  //   console.log("user: ", user);
  //   users.push(user);
  //   res.status(201).json({
  //     status: "success",
  //     code: 201,
  //     data: user,
  //   });
  // });
  // res.json({
  //   status: "success",
  //   code: 200,
  //   data: {
  //     users,
  //   },
  // });
// 