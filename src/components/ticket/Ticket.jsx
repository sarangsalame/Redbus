import React, { useContext, useEffect, useState } from "react";
import BusImg from "../busimg/BusImg";
import SeatContainer from "../seat/SeatContainer";
import { useNavigate } from "react-router-dom";
import ContextData from "../../store/context-data";

const Ticket = ({ ele, setIsClicked, isClicked }) => {
  const [seatNumber, setSeatNumber] = useState("");
  // const [gst, setGst]= useState("sdashf560252dfd52")

  console.log(ele, "ticket");
  const { setBookBusData } = useContext(ContextData);

  useEffect(() => {
    setBookBusData(ele);
  }, [seatNumber]);

  const navigate = useNavigate();

  function bookTicketHandler() {
    navigate("/bookticket");
  }

  return (
    <div>
      <div
        className="api_data"
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        <div className="api_data_elements">
          <h4>Bus Name: </h4>
          {ele.busName.toUpperCase()}
        </div>
        {console.log(ele)}
        <div className="api_data_elements">
          <h4>Arival Time: </h4>
          {ele.arrivalTime}
        </div>
        <div className="api_data_elements">
          <h4>Departure Time: </h4>
          {ele.departureTime}
        </div>
        <div className="api_data_elements">
          <h4>Journey Date: </h4>
          {ele.date}
        </div>
        <div className="api_data_elements">
          <h4>Price: </h4>
          {ele.ticketPrice}/-
        </div>
      </div>
      <div className="seat_details_container">
        <BusImg />
        <SeatContainer seatNumber={seatNumber} setSeatNumber={setSeatNumber} />
        <div className="book_ticket">
          <button onClick={bookTicketHandler}>BOOK TICKET</button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
