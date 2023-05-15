import React, { useContext } from "react";
import ContextData from "../../store/context-data";

import "./seatcontainer.css";
const SeatContainer = () => {
  const { setseat, seatNumber } = useContext(ContextData);

  function selectHandler(e) {
    // setseat(e.target.value);
    console.log(e.target)
    console.log(e.target.getAttribute("value"))
    
    if(e.target.getAttribute("value")){
      e.target.classList.toggle("active");
      setseat(e.target.getAttribute("value"))
      
    }

  }

  return (
    <>
      <div className='seat_container_center'>
        <div className='seat_container'>
          <div className='double_seat' onClick={selectHandler}>
            <div className='row1' >
              <button value='L1'>L1</button>
              <button value='L2'>L2</button>
              <button value='L3'>L3</button>
              <button value='L4'>L4</button>
              <button value='L5'>L5</button>
              <button value='L6'>L6</button>
              <button value='L7'>L7</button>
              <button value='L8'>L8</button>
            </div>
            <div className='row2'>
              <button value='L9'>L9</button>
              <button value='L10'>L10</button>
              <button value='L11'>L11</button>
              <button value='L12'>L12</button>
              <button value='L13'>L13</button>
              <button value='L14'>L14</button>
              <button value='L15'>L15</button>
              <button value='L16'>L16</button>
            </div>
          </div>
          <div className='single_seat' onClick={selectHandler}>
            <button value='L17'>L17</button>
            <button value='L18'>L18</button>
            <button value='L19'>L19</button>
            <button value='L20'>L20</button>
            <button value='L21'>L21</button>
            <button value='L22'>L22</button>
            <button value='L23'>L23</button>
            <button value='L24'>L24</button>
          </div>
        </div>
      </div>
      {seatNumber !== "" && <p className='seatnum'>{seatNumber + " "}</p>}
    </>
  );
};

export default SeatContainer;
