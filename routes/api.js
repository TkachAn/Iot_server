
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
// console.log("uuidv4(4): ", uuidv4());

// const nanoid = require("../node_modules/nanoid");
let tasks = [
  {
    id: 444,
    title: "Work",
    text: "Do it!",
    done: false,
  },
  {
    id: 443,
    title: "Works",
    text: "Do it!!",
    done: false,
  },
];
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
router.get("/tasks/:id", (req, res, next) => {
  const {id} = req.params;
  const [task] = tasks.filter((el) => el.id === id);
  res.json({
    status: "success",
    code: 200,
    data: {task},
  });
});
router.post("/tasks", (req, res, next) => {
  const {title, text} = req.body;
  const task = {
    id: uuidv4(),
    title,
    text,
    done: false,
  };

  tasks.push(task);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {task},
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
module.exports = router;