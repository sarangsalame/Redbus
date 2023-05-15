import React, { useState } from "react";


const ContextData = React.createContext({
  bookBusData: [],
  setBookBusData: (data) => {},
  seatNumber:"",
  setseat:(data)=>{},
  clearSeats: ()=>{}
  
});

function ContextProvider(props) {
  const [bookBusData, setBookBusData] = useState([]);
  const [seatNumber, setSeatNumber]= useState([]);
  
  function bookBus(data) {
    setBookBusData(data);
  }

  function setseat(data){
    console.log(data)
    const existingSeat = seatNumber.find((curr)=>curr===data)
    if(existingSeat){
      const newSeats = seatNumber.filter((ele)=>ele!==data)
      setSeatNumber(newSeats)
    }else{
      setSeatNumber([...seatNumber, data])
    }
  }
  function clearSeats(){
    setSeatNumber([])
  }

  return (
    <ContextData.Provider
      value={{
        bookBusData,
        setBookBusData: bookBus,
        seatNumber,
        setseat,
        clearSeats
       
      }}
    >
      {props.children}
    </ContextData.Provider>
  );
}

export default ContextData;

export { ContextProvider };
