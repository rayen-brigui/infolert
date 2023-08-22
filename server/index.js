require("dotenv").config();
const cors = require("cors");
const express = require("express");
// const mongoose = require("mongoose");
// const mongoString = process.env.DATABASE_URL;

// mongoose.connect("mongodb://127.0.0.1:27017/drax_inv", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const database = mongoose.connection;

// database.on("error", (error) => {
//   console.log(error);
// });

// database.once("connected", () => {
//   console.log("Database Connected");
// });

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run("CREATE TABLE greetings(message text)")
    .run(
      `INSERT INTO greetings(message)
          VALUES('Hi'),
                ('Hello'),
                ('Welcome')`
    )
    .each(`SELECT message FROM greetings`, (err, row) => {
      if (err) {
        throw err;
      }
      console.log(row.message);
    });
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const routes = require("./routes/routes");

app.use("/api", routes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
