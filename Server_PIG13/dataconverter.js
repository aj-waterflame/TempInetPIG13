const { buffHram, buffIntram } = require("./modbus_connect");

const homeview = [
  { name: "tempIndoor", rc: 0, adrs: 0, fc: "i", fcCon: "temp", exp1: -1 },
  { name: "temp1", rc: 1, adrs: 1, fc: "i", fcCon: "temp", exp1: -1 },
  { name: "temp2", rc: 2, adrs: 2, fc: "i", fcCon: "temp", exp1: -1 },
  { name: "temp3", rc: 3, adrs: 3, fc: "i", fcCon: "temp", exp1: -1 },
  { name: "outTemp", rc: 4, adrs: 3, fc: "i", fcCon: "temp", exp1: -1 },
  { name: "hum", rc: 5, adrs: 6, fc: "i", fcCon: "temp", exp1: -1 },
  { name: "co2", rc: 6, adrs: 9, fc: "i", fcCon: "x10", exp1: -1 },
  { name: "nh3", rc: 7, adrs: 10, fc: "i", fcCon: "d", exp1: -1 },
  { name: "tunnelSpf", rc: 8, adrs: 11, fc: "i", fcCon: "d", exp1: -1 },
  { name: "lightInten", rc: 9, adrs: 12, fc: "i", fcCon: "d", exp1: -1 },
  { name: "growthDay", rc: 10, adrs: 21, fc: "i", fcCon: "d", exp1: -1 },
  { name: "reqSpF1Temp", rc: 11, adrs: 22, fc: "i", fcCon: "f1", exp1: -1 },
  { name: "reqFanVentTemp", rc: 12, adrs: 22, fc: "i", fcCon: "f1", exp1: -1 },
  { name: "reqHeaterTemp", rc: 13, adrs: 23, fc: "i", fcCon: "f1", exp1: -1 },
  { name: "reqCoolTemp", rc: 14, adrs: 24, fc: "i", fcCon: "f1", exp1: -1 },
  { name: "reqSprayTemp", rc: 15, adrs: 40, fc: "i", fcCon: "f1", exp1: -1 },
  { name: "reqLowTempAlm", rc: 16, adrs: 41, fc: "i", fcCon: "f1", exp1: -1 },
  { name: "reqHiTempAlm", rc: 17, adrs: 42, fc: "i", fcCon: "f1", exp1: -1 },
  { name: "reqHiSpF1Temp", rc: 18, adrs: 43, fc: "i", fcCon: "f1", exp1: -1 },
  { name: "reqLowSpF1Temp", rc: 19, adrs: 44, fc: "i", fcCon: "f1", exp1: -1 },
  {
    name: "reqLowestSpF1Temp",
    rc: 20,
    adrs: 45,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
  },
  { name: "reqHighSpF1", rc: 21, adrs: 46, fc: "i", fcCon: "d", exp1: -1 },
  { name: "reqSpF1", rc: 22, adrs: 47, fc: "i", fcCon: "d", exp1: -1 },
  { name: "reqLowSpF1", rc: 23, adrs: 48, fc: "i", fcCon: "d", exp1: -1 },
  { name: "reqLowestSpF1", rc: 24, adrs: 48, fc: "i", fcCon: "d", exp1: -1 },
  { name: "hiHumOffCool", rc: 25, adrs: 136, fc: "i", fcCon: "f1", exp1: -1 },
  { name: "hiHumOffSpray", rc: 26, adrs: 143, fc: "i", fcCon: "f1", exp1: -1 },
  { name: "hiNH3Alm", rc: 27, adrs: 150, fc: "i", fcCon: "d", exp1: -1 },
  { name: "hiCo2Alm", rc: 28, adrs: 151, fc: "i", fcCon: "d", exp1: -1 },
  { name: "diffTempAlm", rc: 29, adrs: 176, fc: "h", fcCon: "f1", exp1: -1 },
  { name: "hiHumAlm", rc: 30, adrs: 177, fc: "h", fcCon: "d", exp1: -1 },
  { name: "lowHumAlm", rc: 31, adrs: 178, fc: "h", fcCon: "d", exp1: -1 },
  { name: "numOfFan", rc: 32, adrs: 14, fc: "i", fcCon: "sumfan", exp1: -1 },
];

const fanStatus = [
  {
    name: "statusFan1",
    vla: -1,
    rya: 14,
    ryb: 0,
    rsa: 16,
    rsb: 0,
    mode: "nfw",
    rc: 0,
  },
  {
    name: "statusFan2",
    vla: -1,
    rya: 14,
    ryb: 1,
    rsa: 16,
    rsb: 1,
    mode: "nfw",
    rc: 1,
  },
  {
    name: "statusFan3",
    vla: -1,
    rya: 14,
    ryb: 2,
    rsa: 16,
    rsb: 2,
    mode: "nfw",
    rc: 2,
  },
  {
    name: "statusFan4",
    vla: -1,
    rya: 14,
    ryb: 3,
    rsa: 16,
    rsb: 3,
    mode: "nfw",
    rc: 3,
  },
  {
    name: "statusFan5",
    vla: -1,
    rya: 14,
    ryb: 4,
    rsa: 16,
    rsb: 4,
    mode: "nfw",
    rc: 4,
  },
  {
    name: "statusFan6",
    vla: -1,
    rya: 14,
    ryb: 5,
    rsa: 16,
    rsb: 5,
    mode: "nfw",
    rc: 5,
  },
  {
    name: "statusFan7",
    vla: -1,
    rya: 14,
    ryb: 6,
    rsa: 16,
    rsb: 6,
    mode: "nfw",
    rc: 6,
  },
  {
    name: "statusFan8",
    vla: -1,
    rya: 14,
    ryb: 7,
    rsa: 16,
    rsb: 7,
    mode: "nfw",
    rc: 7,
  },
];
const alarmStatus = [
  {
    name: "al1",
    vla: -1,
    rya: 17,
    ryb: 0,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 202,
  },
  {
    name: "al2",
    vla: -1,
    rya: 17,
    ryb: 1,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 203,
  },
  {
    name: "al3",
    vla: -1,
    rya: 17,
    ryb: 2,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 204,
  },
  {
    name: "al4",
    vla: -1,
    rya: 17,
    ryb: 3,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 205,
  },
  {
    name: "al5",
    vla: -1,
    rya: 17,
    ryb: 4,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 206,
  },
  {
    name: "al6",
    vla: -1,
    rya: 17,
    ryb: 5,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 207,
  },
  {
    name: "al7",
    vla: -1,
    rya: 17,
    ryb: 6,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 208,
  },
  {
    name: "al8",
    vla: -1,
    rya: 17,
    ryb: 7,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 209,
  },
  {
    name: "al9",
    vla: -1,
    rya: 17,
    ryb: 8,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 210,
  },
  {
    name: "al10",
    vla: -1,
    rya: 17,
    ryb: 9,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 211,
  },
  {
    name: "al11",
    vla: -1,
    rya: 17,
    ryb: 10,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 212,
  },
  {
    name: "al12",
    vla: -1,
    rya: 17,
    ryb: 11,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 213,
  },
  {
    name: "al13",
    vla: -1,
    rya: 17,
    ryb: 12,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 214,
  },
  {
    name: "al14",
    vla: -1,
    rya: 17,
    ryb: 13,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 215,
  },
  {
    name: "al15",
    vla: -1,
    rya: 17,
    ryb: 14,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 216,
  },
  {
    name: "al16",
    vla: -1,
    rya: 17,
    ryb: 15,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 217,
  },
  {
    name: "al17",
    vla: -1,
    rya: 18,
    ryb: 0,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 218,
  },
  {
    name: "al18",
    vla: -1,
    rya: 18,
    ryb: 1,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 219,
  },
  {
    name: "al19",
    vla: -1,
    rya: 18,
    ryb: 2,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 220,
  },
  {
    name: "al20",
    vla: -1,
    rya: 18,
    ryb: 3,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 221,
  },
  {
    name: "al21",
    vla: -1,
    rya: 18,
    ryb: 4,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 222,
  },
  {
    name: "al22",
    vla: -1,
    rya: 18,
    ryb: 5,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 223,
  },
  {
    name: "al23",
    vla: -1,
    rya: 18,
    ryb: 6,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 224,
  },
  {
    name: "al24",
    vla: -1,
    rya: 18,
    ryb: 7,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 225,
  },
  {
    name: "al25",
    vla: -1,
    rya: 18,
    ryb: 8,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 226,
  },
  {
    name: "al26",
    vla: -1,
    rya: 18,
    ryb: 9,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 227,
  },
  {
    name: "al27",
    vla: -1,
    rya: 18,
    ryb: 10,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 228,
  },
  {
    name: "al28",
    vla: -1,
    rya: 18,
    ryb: 11,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 229,
  },
  {
    name: "al29",
    vla: -1,
    rya: 18,
    ryb: 12,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 230,
  },
  {
    name: "al30",
    vla: -1,
    rya: 18,
    ryb: 13,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 231,
  },
  {
    name: "al31",
    vla: -1,
    rya: 18,
    ryb: 14,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 232,
  },
  {
    name: "al32",
    vla: -1,
    rya: 18,
    ryb: 15,
    rsa: -1,
    rsb: -1,
    mode: "nf",
    rc: 233,
  },
];
const fanView = [
  {
    name: "fan1On",
    rc: 1,
    adrs: 66,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan1Off",
    rc: 2,
    adrs: 67,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan1Vent",
    rc: 3,
    adrs: 68,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan2On",
    rc: 4,
    adrs: 73,
    fc: "i",
    fcCon: "f1",
    exp1: 86,
    exp2: "n",
  },
  {
    name: "fan2Off",
    rc: 5,
    adrs: 74,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan2Vent",
    rc: 6,
    adrs: 75,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan3On",
    rc: 7,
    adrs: 80,
    fc: "i",
    fcCon: "f1",
    exp1: 91,
    exp2: "n",
  },
  {
    name: "fan3Off",
    rc: 8,
    adrs: 81,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan3Vent",
    rc: 9,
    adrs: 82,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan4On",
    rc: 10,
    adrs: 87,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan4Off",
    rc: 11,
    adrs: 88,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan4Vent",
    rc: 12,
    adrs: 89,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan5On",
    rc: 13,
    adrs: 94,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan5Off",
    rc: 14,
    adrs: 95,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan5Vent",
    rc: 15,
    adrs: 96,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan6On",
    rc: 16,
    adrs: 101,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan6Off",
    rc: 17,
    adrs: 102,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan6Vent",
    rc: 18,
    adrs: 103,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan7On",
    rc: 19,
    adrs: 108,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan7Off",
    rc: 20,
    adrs: 109,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan7Vent",
    rc: 21,
    adrs: 110,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan8On",
    rc: 22,
    adrs: 115,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan8Off",
    rc: 23,
    adrs: 116,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "fan8Vent",
    rc: 24,
    adrs: 117,
    fc: "i",
    fcCon: "f1",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "timeOffFan1",
    rc: 25,
    adrs: 70,
    fc: "i",
    fcCon: "d",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "timeOffFan2",
    rc: 26,
    adrs: 77,
    fc: "i",
    fcCon: "d",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "timeOffFan3",
    rc: 27,
    adrs: 84,
    fc: "i",
    fcCon: "d",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "timeOnFan4",
    rc: 28,
    adrs: 90,
    fc: "i",
    fcCon: "d",
    exp1: 91,
    exp2: "tmOn",
  },
  {
    name: "timeOffFan4",
    rc: 29,
    adrs: 91,
    fc: "i",
    fcCon: "d",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "timeOffFan5",
    rc: 30,
    adrs: 98,
    fc: "i",
    fcCon: "d",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "timeOffFan6",
    rc: 31,
    adrs: 105,
    fc: "i",
    fcCon: "d",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "timeOffFan7",
    rc: 32,
    adrs: 112,
    fc: "i",
    fcCon: "d",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "timeOffFan8",
    rc: 33,
    adrs: 119,
    fc: "i",
    fcCon: "d",
    exp1: -1,
    exp2: "n",
  },
  {
    name: "timeOnFan1",
    rc: 34,
    adrs: 69,
    fc: "i",
    fcCon: "tmOn",
    exp1: 70,
    exp2: "tmOn",
  },
  {
    name: "timeOnFan2",
    rc: 35,
    adrs: 76,
    fc: "i",
    fcCon: "tmOn",
    exp1: 77,
    exp2: "tmOn",
  },
  {
    name: "timeOnFan3",
    rc: 36,
    adrs: 83,
    fc: "i",
    fcCon: "tmOn",
    exp1: 84,
    exp2: "tmOn",
  },
  {
    name: "timeOnFan5",
    rc: 37,
    adrs: 97,
    fc: "i",
    fcCon: "tmOn",
    exp1: 98,
    exp2: "tmOn",
  },
  {
    name: "timeOnFan6",
    rc: 38,
    adrs: 104,
    fc: "i",
    fcCon: "tmOn",
    exp1: 105,
    exp2: "tmOn",
  },
  {
    name: "timeOnFan7",
    rc: 39,
    adrs: 111,
    fc: "i",
    fcCon: "tmOn",
    exp1: 112,
    exp2: "tmOn",
  },
  {
    name: "timeOnFan8",
    rc: 40,
    adrs: 118,
    fc: "i",
    fcCon: "tmOn",
    exp1: 119,
    exp2: "tmOn",
  },
];
function dec2bin(dec) {
  let data = (dec >>> 0).toString(2).padStart(16, 0);
  data = data.split("");
  data = data.reverse();
  data = data.join("");
  return data;
}
function convGeneraldata(datain, id) {
  return datain.map((v, i, a) => {
    let data;
    v.fc == "i" ? (data = buffIntram[id]) : (data = buffHram[id]);
    let view;
    switch (v.fcCon) {
      case "f1":
        view = data[v.adrs] / 10;
        // console.log(v.name, view);
        break;
      case "f2":
        view = data[v.adrs] / 100;
        // console.log(v.name, view);
        break;
      case "d":
        view = data[v.adrs];
        // console.log(v.name, view);
        break;
      case "x10":
        view = data[v.adrs] * 10;
        // console.log(v.name, view);
        break;
      case "f3":
        view = data[v.adrs] / 1000;
        // console.log(v.name, view);
        break;

      case "sumfan":
        let buff;
        buff = dec2bin(data[v.adrs]).split("");
        // console.log(buff);
        view = 0;
        buff.map((v) => {
          v == "1" ? (view += 1) : (view += 0);
          // console.log(`v = ${v} view = ${view}`);
        });

        // console.log(v.name, view);
        break;

      case "tmOn":
        {
          if (data[v.exp1] != 0) {
            view = data[v.adrs];
          } else {
            view = 0;
          }
        }
        // console.log(
        //   `View :${view} dataOn :${data[v.adrs]} dataOff:${data[v.exp1]}`
        // );
        break;
      case "temp":
        view = data[v.adrs] / 10;
        if (view >= -19.9) {
          view = view;
        } else if (view == -20.1) {
          view = "Short";
        } else {
          view = "Open";
        }

        //  console.log(v.name, view);
        break;
      default:
        break;
    }
    // console.log(v.name, view);

    return { name: v.name, value: view, rc: v.rc };
  });
}
function convStatus(typeIn, id) {
  let data, status;
  data = buffIntram[id];
  return typeIn.map((v, i) => {
    let fdata = dec2bin(data[v.rya])[v.ryb];
    let sdata = dec2bin(data[v.rsa])[v.rsb];
    let vdata = v.vla;

    switch (v.mode) {
      case "nf":
        fdata == 0 ? (status = "ON") : (status = "OFF");
        break;
      case "nfw":
        if (fdata == 1) {
          status = "ON";
        } else if (sdata == 1) {
          status = "WAIT";
        } else {
          status = "OFF";
        }

        break;
      case "spf":
        if (fdata == 1) {
          status = "ON";
        } else if (vdata >= 1) {
          status = "WAIT";
        } else {
          status = "OFF";
        }
        break;
      default:
        break;
    }
    return { name: v.name, value: status, rc: v.rc };
  });

  
}

function toJsonstring(convertData) {
  let jsonString = [];
  jsonString.push(`"status":"OK"`);
  jsonString.push(`"date_time":"${new Date().toISOString()}"`);
  convertData.map((v, i) => {
    const stbuff = `"${v.name}":"${v.value}"`;
    // console.log(stbuff.toString());

    jsonString.push(stbuff);
  });
  // jsonString =`{ ${jsonString} }`
  console.log(`{${jsonString.toString()}}`);
  return `{${jsonString.toString()}}`;
}

module.exports = {
  convStatus,
  convGeneraldata,
  toJsonstring,
  alarmStatus,
  fanStatus,
  homeview,
  fanView,
};
