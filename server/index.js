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
  const { text, date, bookmark } = req.body;
  const insertQuery =
    "INSERT INTO `note-app`.note (text, date, bookmark ) VALUE (?,?,?)";
  db.query(insertQuery, [text, date, bookmark], (err, data) => {
    if (err) {
      return res.send(err);
    }
    if (data) {
      return res.send("추가 완료");
    }
  });
});

app.post("/updateNote", (req, res) => {
  const { id, text } = req.body;
  const updateQuery = "UPDATE `note-app`.note SET `text` = ? WHERE (`id` = ?);";
  db.query(updateQuery, [text, id], (err, data) => {
    if (err) {
      return res.send(err);
    }
    if (data) {
      return res.send("업데이트 완료");
    }
  });
});

app.post("/bookmarkNote", (req, res) => {
  const { id } = req.body;
  const selectQuery = "SELECT bookmark FROM `note-app`.note where id = ?";
  const bookmarkTrueQuery =
    "UPDATE `note-app`.`note` SET `bookmark` = '1' WHERE (`id` = ?);";
  const BookmarkFalseQuery =
    "UPDATE `note-app`.`note` SET `bookmark` = '0' WHERE (`id` = ?);";
  db.query(selectQuery, [id], (err, data) => {
    if (err) {
      return res.send(err);
    }
    if (data) {
      let isBookmark = data[0].bookmark;
      if (isBookmark === 0) {
        db.query(bookmarkTrueQuery, [id], (err, data) => {
          if (err) {
            return res.send(err);
          }
          if (data) {
            return res.send("북마크 추가 완료");
          }
        });
      } else {
        db.query(BookmarkFalseQuery, [id], (err, data) => {
          if (err) {
            return res.send(err);
          }
          if (data) {
            return res.send("북마크 해제 완료");
          }
        });
      }
    }
  });
});

app.post("/deleteNote", (req, res) => {
  const { id } = req.body;
  const deleteQuery = "DELETE FROM `note-app`.note WHERE (`id` = ?)";
  db.query(deleteQuery, [id], (err, data) => {
    if (err) {
      return res.send(err);
    }
    if (data) {
      return res.send("삭제 완료");
    }
  });
});

app.get("/list", (req, res) => {
  const selectQuery = "SELECT * FROM `note-app`.note";
  db.query(selectQuery, (err, data) => {
    if (err) {
      return res.send(err);
    }
    if (data) {
      return res.send(data);
    }
  });
});

app.get("/bookmark", (req, res) => {
  const selectQuery = "SELECT * FROM `note-app`.note WHERE bookmark = '1'";
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
