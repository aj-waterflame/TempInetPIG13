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


router.get("/fan-view", (req, res) => {
    const data =toJsonstring(convGeneraldata(fanView,0).concat(convStatus(fanStatus, 0)))
    res.send(data);
  });
  router.get("/alarm-event", (req, res) => {
    res.send(convStatus(alarmStatus, 0));
  });

  module.exports=router