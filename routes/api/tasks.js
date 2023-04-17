const express = require("express");
const router = express.Router();
const {v4: uuidv4} = require("uuid");
// console.log("uuidv4(4): ", uuidv4());
const db = require("../../db/db.json");
// const nanoid = require("../node_modules/nanoid");
// console.log("db.devices: ", db.devices);
// console.log("db.users: ", db.users);
const users = db.users;
const devices = db.devices;

// const numId = [];
// for (const i of tasks) {
// 	numId.push(i.id);
// }
// console.log("numId: ", numId);
// const {id}=tasks
//  const nid = Math.max.apply(null, numId)+1;//Math.max(numId);//getMaxOfArray(numId);//
// console.log("nid: ", nid);

router.get("/tasks", (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      tasks,
    },
  });
});
router.get("/db", (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      db,
    },
  });
});
router.get("/dev", (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      devices,
    },
  });
});
router.get("/user", (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      users,
    },
  });
});
router.get("/user/:id", (req, res, next) => {
  const {id} = req.params;
  const [user] = users.filter((el) => el.id === id);
  res.json({
    status: "success",
    code: 200,
    data: user,
  });
});
router.get("/tasks/:id", (req, res, next) => {
  const {id} = req.params;
  // console.log("id: ", id);
  const [task] = tasks.filter((el) => el.id === id);
  console.log("task: ", task);
  res.json({
    status: "success",
    code: 200,
    data: task,
  });
});
router.post("/tasks", (req, res, next) => {
  const {title, text} = req.body;
  // console.log("title: ", title);
  const task = {
    id: uuidv4(),
    title,
    text,
    done: false,
  };
  console.log("task: ", task);
  tasks.push(task);
  console.log("tasks: ", tasks);
  res.status(201).json({
    status: "success",
    code: 201,
    data: task,
  });
});
router.put("/tasks/:id", (req, res, next) => {
  const {id} = req.params;
  const {title, text} = req.body;
  const [task] = tasks.filter((el) => el.id === id);
  task.title = title;
  task.text = text;
  res.json({
    status: "success",
    code: 200,
    data: {task},
  });
});
router.patch("/tasks/:id/status", (req, res, next) => {
  const {id} = req.params;
  const {done} = req.body;
  const [task] = tasks.filter((el) => el.id === id);
  task.done = done;
  res.json({
    status: "success",
    code: 200,
    data: {task},
  });
});
router.delete("/tasks/:id", (req, res, next) => {
  const {id} = req.params;
  const newtasks = tasks.filter((el) => el.id !== id);
  tasks = [...newtasks];
  res.status(204).json();
});

let tasks = [
  {
    id: "444",
    title: "Work",
    text: "Do it!",
    done: false,
  },
  {
    id: "443",
    title: "Works",
    text: "Do it!!",
    done: false,
  },
];
module.exports = router;
