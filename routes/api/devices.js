const express = require("express");
const router = express.Router();
const {v4: uuidv4} = require("uuid");
// console.log("uuidv4(4): ", uuidv4());
const db = require("../../db/db.json");
// console.log("db.devices: ", db.devices);
const devices = db.devices;
const mongoose = require('mongoose');
const DB_HOST = "mongodb://localhost:27017/box";
mongoose.connect(DB_HOST)
	.then(() => console.log("CONNECT!!!: "))
	.catch((error) => console.log("error: ", error));


router.get("/", (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      devices,
    },
  });
});

router.get("/:id", (req, res, next) => {
  const {id} = req.params;
  const [device] = devices.filter((el) => el.id === id);
  res.json({
    status: "success",
    code: 200,
    data: device,
  });
});

router.post("/", (req, res, next) => {
  const {
    name = "noName",
    description = "",
    type = "sensor",
    map,
    owner = "0",
    location = "mykolaiv",
  } = req.body;
  // console.log("title: ", title);
  const device = {
    id: uuidv4(),
    name,
    description,
    type,
    owner,
    map,
    location,
    done: false,
  };
  console.log("device: ", device);
  devices.push(device);
  res.status(201).json({
    status: "success",
    code: 201,
    data: device,
  });
});
router.put("/:id", (req, res, next) => {
  const {id} = req.params;
  const {name, description, type, map, owner, location} = req.body;
  const [device] = devices.filter((el) => el.id === id);
  device.name = name;
	device.description = description;
	device.type = type;
	device.owner = owner;
	device.map = map;
	device.location = location;
  res.json({
    status: "success",
    code: 200,
    data: device,
  });
});
router.patch("/:id/status", (req, res, next) => {
  const {id} = req.params;
  const {done} = req.body;
  const [device] = devices.filter((el) => el.id === id);
  device.done = done;
  res.json({
    status: "success",
    code: 200,
    data: device,
  });
});
router.delete("/:id", (req, res, next) => {
  const {id} = req.params;
  const newdevices = devices.filter((el) => el.id !== id);
  devices = [...newdevices];
  res.status(204).json();
});

module.exports = router;
