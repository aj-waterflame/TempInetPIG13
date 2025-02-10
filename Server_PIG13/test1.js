async function updateRealtime(params) {
    updateRTdata().catch(async (e) => {
      console.error(e);
    });
  }
  function show (input){
    console.log(input);
    
  }
  
  // show(findRTdata())
  // updateRTdata()
  let fnd = findRTdata()
  console.log("test",fnd[0]);
  
   createRTdata()
  // dateNow()
  async function findRTdata(){
    const data= await prisma.rtdata.findMany({
      select:{
        rc0: true,rc1:true,rc2:true
      }
  
    })
    console.log(data);
    const out = await data.toString()
    return out
  }
  async function createRTdata() {
    await prisma.rtdata.create({
      data: {
        rc1: dateNow(),
        rc3: "1",
        rc13: "21.5",
        rc14: "21.6",
        rc15: "21.7",
        rc16: "21.8",
      },
    });
  }
  
  async function updateRTdata() {
    await prisma.rtdata.updateMany({
      where: { rc3: "1" },
      data: {
        rc1: dateNow(),
        rc13: "27.6",
        rc14: "28.6",
        rc15: "29.7",
        rc16: "23.8",
      },
    });
  }
  
  // async function main() {
  //   await prisma.realtime_data.create({
  //     data: {
  //       rc1: dateNow(),
  //       rc2: "20.5",
  //       rc3: "21.5",
  //       rc4: "22.5",
  //     },
  //   });
  // }
  
  function dateNow() {
    const dt = new Date();
    let date = `${dt.getFullYear()}-${
      dt.getMonth() + 1
    }-${dt.getDate()}T${dt.getHours()}:${dt.getMinutes()}:00`;
  
    
    date = dt.toISOString();
    // date = date.replace("Z", "");
    console.log(date);
    return date;
  }
  
  // console.log(`Date time = ${dateNow()}`);
  
  // let  date = new Date()
  // let  startTimeISOString =date
  // console.log(date.toISOString());
  
  // let startTime = new Date(startTimeISOString );
  // console.log(startTime.getTime());
  
  // console.log(startTime.getTimezoneOffset()*60000);
  
  // if(startTime.getTimezoneOffset()>=0){
  //   startTime =   new Date( startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 ));
  // }
  // else{
  //   startTime =   new Date( startTime.getTime() - ( startTime.getTimezoneOffset() * 60000 ));
  // }
  //  startTime =   new Date( startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 ));
  
  //  console.log(startTime);
  