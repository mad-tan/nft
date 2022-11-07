const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const mysql = require("mysql")

var ethers = require('ethers');  
var crypto = require('crypto');
var id = crypto.randomBytes(32).toString('hex');
var privateKey = "0x"+id;

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"tanmay",
    database:"nft",
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get',(req,res)=>{
    const sqlSelect = "SELECT* FROM login;"
    db.query(sqlSelect, (err,result)=>{
        res.send(result)
    }) 
})

app.post("/api/insert",(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const address = req.body.address
    const phone = req.body.phone
    const cphone = req.body.cphone
    const city = req.body.city
    const state = req.body.state
    const zip = req.body.zip
    const type = "GOLD";

    const sqlInsert = "INSERT INTO login (email,password,first_name,last_name,address,phone,cell_phone,city,state,zip,type,eth_adr) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);"

    db.query(sqlInsert,[email,password,firstname,lastname,address,phone,cphone,city,state,zip,type,privateKey], (err,result)=>{
     console.log(err)   
    })
})

app.get("/nft", (req, res) => {
    db.query("SELECT name,price_usd,price_eth FROM nft_list", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, () => {
    console.log("running")
})