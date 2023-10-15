const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.post("/addNote", (req, res) => {
  const { text, date } = req.body;
  const insertQuery = "INSERT INTO `note-app`.note (text, date ) VALUE (?,?)";
  db.query(insertQuery, [text, date], (err, data) => {
    if (err) {
      return res.send(err);
    }
    if (data) {
      return res.send("추가 완료");
    }
  });
});

app.get("/list", (req, res) => {
  const selectQuery = "SELECT * FROM `note-app`.note;";
  db.query(selectQuery, (err, data) => {
    if (err) {
      return res.send(err);
    }
    if (data) {
      return res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
