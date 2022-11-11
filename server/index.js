const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
var ethers = require("ethers");
var crypto = require("crypto");
var id = crypto.randomBytes(32).toString("hex");
var privateKey = "0x" + id;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "tanmay",
  database: "nft",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM login where login_id=1;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const address = req.body.address;
  const phone = req.body.phone;
  const cphone = req.body.cphone;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const type = "GOLD";
  const balance = req.body.balance;

  const sqlInsert =
    "INSERT INTO login (email,password,first_name,last_name,address,phone,cell_phone,city,state,zip,type,eth_adr,bal_usd) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);";

  db.query(
    sqlInsert,
    [
      email,
      password,
      firstname,
      lastname,
      address,
      phone,
      cphone,
      city,
      state,
      zip,
      type,
      privateKey,
      balance,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/nft/buy", (req, res) => {
  const buyname = req.body.buyname;
  const buyid = req.body.buyid;
  const userEmail = req.body.userEmail;

  const sqlUpdate = "UPDATE nft_list SET is_avl = 0  WHERE (token_id = ?);";
  db.query(sqlUpdate, [buyid], (err, result) => {
    console.log(err);
  });

  const sqlInsert = "INSERT INTO nft_owned VALUES (?,?,?)";
  db.query(sqlInsert, [1, buyid, buyname], (err, result) => {
    console.log(err);
  });
});

app.get("/nft/get", (req, res) => {
  db.query(
    "SELECT N.token_id, N.name,N.price_usd,N.price_eth FROM nft_owned O, nft_list N where O.lid=2 and O.tid=N.token_id;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/nft", (req, res) => {
  db.query(
    "SELECT name,token_id,price_usd,price_eth FROM nft_list where is_avl=1;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/nft/sell", (req, res) => {
  const sellid = req.body.sellid;

  const sqlUpdate = "UPDATE nft_list SET is_avl = 1  WHERE (token_id = ?);";
  db.query(sqlUpdate, [sellid], (err, result) => {
    console.log(err);
  });

  const sqlInsert = "DELETE FROM nft_owned WHERE (tid = ?)";
  db.query(sqlInsert, [sellid], (err, result) => {
    console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running");
});
