const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser")
const cors = require('cors')
const {readdirSync}=require('fs')



const {
  HouseInfo,
  client,
  ramInt,
  ramHold,
  buffIntram,
  buffHram,
  hStatus,
  serialConfig,
  mb_addressArange,
  convU2I,
  sleep,
  readHome,
  mbConnect,
} = require("./modbus_connect");
const {
  convStatus,
  convGeneraldata,
  toJsonstring,
  alarmStatus,
  fanStatus,
  homeview,
  fanView,
} = require("./dataconverter");

// <<========================Server=====================================

// ===========================Middle ware============================

app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(cors())


// <<===========================API===================================

readdirSync('./routers')
.map((v)=>{
  console.log(v);
  app.use('/api',require("./routers/"+v))
})

  
  



// ===========================API===================================>>



app.listen(5000, () => {
  console.log("Hello server at port 5000");
});

// ========================Server=====================================>>

// <<========================Modbus=====================================



runModbus();


function runModbus() {
  mbConnect();
  setInterval(() => {
    readHome();
    // console.log(convGeneraldata(homeview,0));
    // console.log(convGeneraldata(fanView,0).concat(convStatus(fanStatus, 0)));
    // console.log(convStatus(fanStatus, 0));
    // console.log(buffHram);
    // console.log(hStatus);
    // testt2(1)
  }, 3000);
}
// ========================Modbus=====================================>>
