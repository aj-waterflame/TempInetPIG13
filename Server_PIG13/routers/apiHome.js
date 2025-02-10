const express =require('express')
const router = express.Router()
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
  } = require("../modbus_connect");
  const {
    convStatus,
    convGeneraldata,
    toJsonstring,
    alarmStatus,
    fanStatus,
    homeview,
    fanView,
  } = require("../dataconverter");
router.post("/home", (req, res) => {
    console.log(req.body);
    const data ='Welcome to  Home and Post data'
    res.send(data);
  });
  
  router.get("/home", (req, res) => {
    console.log(req.query);
    const {query:{house,token}}=req
    console.log(token,house);
    
     
    
    const data =toJsonstring(convGeneraldata(homeview,house-1))
    console.log(typeof(data) );
    console.log(typeof(data) );
    // data= JSON.parse(data)
    console.log(typeof(data) );
    
    res.send(data);
  });

  module.exports=router