import React,{useEffect,useState} from "react"
// import{ramInt}from "../../Server_PIG13/modbus_connect"
import axios from "axios"
const App = () => {

  const[data,setData] = useState([])
  useEffect(()=>{
    getData()
  },[])
  const getData = async()=>{
    const url = "http://localhost:5000/api/home?house=1&token=asdf12345"
    // const url ="http://68.183.231.70:8001/api/home?token=25eaeca4-ebd8-11ed-b5ef-d108c380b09b&house=1"
    const resp = await axios.get(url);

    let data =resp.data
    // data ={name: "aj " ,age :48}
    console.log(typeof(data));
    // data =JASON.pares(data)
    console.log( 'jasonpsre', typeof(data));
    console.log(data);
    
    
    setData( data  );
    // setData("Hello react");
    
  }
  
  return (
    <>
    <div>Temperature :{data.tempIndoor} </div>
    <div>Humidity :{data.hum} </div>
    <div>Status :{data.status} </div>
    <div>Date :{data.date_time} </div>
    </>
    
  )
}
export default App