const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
const { FarmName, HouseInfo } = require("./houseInfo.json");
const ramInt = mb_addressArange([[0, 151]]); //151
const ramHold = mb_addressArange([
  [65400, 65406],
  [176, 178],     
  [1899, 1899],[32264,32279]
]);
let buffIntram = Array.from(Array(30), () => new Array(99999));
let buffHram = Array.from(Array(30), () => new Array(99999));
let hStatus = Array(30);
let flagdata = Array(30);
let  serialConfig={port : "COM4",baudRate : 9600}  


function mb_addressArange(ar) {
  let out = new Array();
  ar.map((data, i) => {
    let str = data[0];
    let end = data[1];
    let a = new Array();
    do {
      a = [str, 32];
      str += 32;
      if (str > end) {
        a[1] = end - (str - 32) + 1;
      } else {
      }
      out.push(a);
    } while (str < end);
  });

  return out;
}
function convU2I(value) {
  let ref = value & 0xffff;
  return ref > 0x7fff ? ref - 0x10000 : ref;
}
async function readHome() {
  let data;
  for (let hi = 0; hi < HouseInfo.length; hi++) {
    let v = HouseInfo[hi];
    let ida = Number(v.ID) - 1;
    ida = hi;
    if (v.use == 1) {
      await client.setID(v.ID);
      // console.log(client);
      // console.log(`ID :${v.ID} , ida : ${ida}`);
      try {
        // ------------------Read Input Register-----------------------------
        // console.log(client);
        let buff1, data1, buff2, data2;
        for (let i = 0; i < ramInt.length; i++) {
          const st = ramInt[i][0];
          const am = ramInt[i][1];

          buff1 = await client.readInputRegisters(st, am);
          if (buff1 != undefined) {
            data1 = await buff1.data;
            data1.map((v, i) => {
              buffIntram[ida][st + i] = convU2I(v);
              hStatus[ida] = 1;
            });
          } else {
            buffIntram[ida] = Array(99999);
            hStatus[ida] = 2;
          }
        }
        // ------------------Read Holding Register-----------------------------
        await sleep(100);
        for (let i = 0; i < ramHold.length; i++) {
          const st = ramHold[i][0];
          const am = ramHold[i][1];

          buff1 = await client.readHoldingRegisters(st, am);
          if (buff1 != undefined) {
            data1 = await buff1.data;
            data1.map((v, i) => {
              buffHram[ida][st + i] = convU2I(v);
              hStatus[ida] = 1;
            });
          } else {
            buffHram[ida] = Array(99999);
            hStatus[ida] = 2;
          }
        }
      } catch (error) {
        console.log(error.message);
        switch (error.name) {
          case "TransactionTimedOutError":
            {
              buffIntram[ida] = Array(99999);
              buffHram[ida] = Array(99999);
              hStatus[ida] = 2;
            }
            break;
          case "PortNotOpenError":
            {
              buffIntram = Array.from(Array(30), () => new Array(99999));
              buffHram = Array.from(Array(30), () => new Array(99999));
              hStatus = Array(30);
              mbConnect();
              return;
            }
            break;

          default:
            break;
        }

        // name: PortNotOpenError
        // Port Not Open
        // name TransactionTimedOutError
        // errno: ETIMEDOUT
        // errno: ECONNREFUSED
      }
    }
    await sleep(100);
  }

  
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function mbConnect() {
  try {
    console.log("start connection");
    let dd = await client.connectRTUBuffered(serialConfig.port, { baudRate: serialConfig.baudRate });
    client.setTimeout(500);
    client.setID(1);
    
  } catch (error) {
    console.log(error);
  }
}

// ---------------------------for Test----------------------------------


async function testt2(id) {
  try {
    client.setID(id);
    let data = await client.readHoldingRegisters(32264, 16);
    data = data.data;
    console.log(data);
  } catch (error) {
    console.log(error, "error message");
    console.log(error.message);
    // Port Not Open
    if (error.name == "PortNotOpenError") {
      // mbConnect();
    }
  }
}

module.exports={

    HouseInfo,client,ramInt,ramHold,buffIntram,buffHram,hStatus,serialConfig,mb_addressArange,convU2I,sleep,readHome,mbConnect




}