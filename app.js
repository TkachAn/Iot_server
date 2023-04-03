const express = require("express");
const app = express();
const port = 3210;
//
app.use((req, res, next) => {
  console.log("Наше промежуточное ПО");
  next();
});

app.get("/", (rec, res) => {
  res.send("<h1>hello IoT world</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact page</h1>");
});

app.get("/contact/:id", (req, res) => {
  res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
});

app.listen(port, () => {
  console.log("server started!");
});
