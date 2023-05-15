import React, { useState, useContext } from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import "./search.css";
import TitleComp from "../title/TitleComp";
import Ticket from "../ticket/Ticket";
import ContextData from "../../store/context-data";


const Search = () => {
  let [el, setEl] = useState();
  let [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
  });
  const [err, setErr] = useState({
    errSrc: false,
    errDest: false,
    errDate: false,
  });
  const [busApiData, setBusApiData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);


  // getting source destination
  const getSource = (e) => {
    let val = e.target.value;
    setFormData({ ...formData, source: val });
  };

  //getting final destination
  const getDestination = (e) => {
    let val = e.target.value;
    setFormData({ ...formData, destination: val });
  };

  // getting travel date on changing
  const getTravelDate = (e) => {
    let val = e.target.value;
    setFormData({ ...formData, date: val });
  };

  //for switching cities
  const alterInput = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      source: formData.destination,
      destination: formData.source,
    });
  };
  // check if all input fields are filled or notif all goes well then display data

  const { clearSeats } = useContext(ContextData);
  const checkAvailability = (e) => {
    e.preventDefault();
    clearSeats();
    if (
      formData.source === "" ||
      formData.destination === "" ||
      formData.date === ""
    ) {
      setErr(true);
    } else {
      setErr(false);
      getapidata();
    }

    if (formData.source === "") {
      setErr({ ...err, errSrc: true })
    } else {
      setErr({ ...err, errSrc: false })
    }


  };
  async function getapidata() {
    await fetch(
      `https://content.newtonschool.co/v1/pr/63b70222af4f30335b4b3b9a/buses?source=${formData.source.toLowerCase()}&destination=${formData.destination.toLowerCase()}`
    )
      .then((res) => res.json())
      .then((json) => setBusApiData(json));
  }

  function sortByPrice() {
    let newApidata = [...busApiData];
    newApidata.sort(function (a, b) {
      return Number(a.ticketPrice) - Number(b.ticketPrice);
    });

    setBusApiData(newApidata);
    console.log(busApiData);
  }

  function sortByArivalTime() {
    let newBusData = busApiData.sort(function (a, b) {
      console.log(a, b, "from search")
      if (a.arrivalTime < b.arrivalTime) {
        return 1;
      }
      if (a.arrivalTime > b.arrivalTime) {
        return -1;
      }
      return 0;
    });
    setBusApiData(newBusData);
    console.log(busApiData);
  }

  function sortByDepartureTime() {
    let newBusData = busApiData.sort(function (a, b) {
      if (a.departureTime < b.departureTime) {
        return -1;
      }
      if (a.departureTime > b.departureTime) {
        return 1;
      }
      return 0;
    });
    setBusApiData(newBusData);
    console.log(busApiData);
  }

  function selectingSeats(ele) {
    console.log(ele, "elel");
    setEl(ele);
    setIsClicked(!isClicked);
  }




  return (
    <>
      <div className='container'>
        <form className='search'>
          <div className='inp__container'>
            <span>FROM</span>
            <input
              type='text'
              autoComplete="name"
              placeholder='Source'
              value={formData.source}
              onChange={getSource}
            />
            {err.errSrc ? <div className='err__msg'>Please fill input fields</div> : null}
          </div>

          <div className='inp__container'>
            <button className='switch' onClick={alterInput}>
              <BsArrowLeftRight fontWeight={600} />
            </button>
          </div>
          <div className='inp__container'>
            <span>TO</span>
            <input
              type='text'
              autoComplete="name"
              placeholder='Destination'
              value={formData.destination}
              onChange={getDestination}
            />
          </div>

          <div className='inp__container'>
            <span>DATE</span>
            <input type='date' value={formData.date} onChange={getTravelDate} />
          </div>
          <div className='inp__container'>
            <button
              className='search__btn'
              type='submit'
              onClick={checkAvailability}
            >
              SEARCH BUSES
            </button>



          </div>
        </form>


        {busApiData.length > 0 ? (
          <div className='ul_api'>

            <div className='sorting'>
              <h4>Sort By:</h4>
              <button onClick={sortByPrice}>Price</button>
              <button onClick={sortByArivalTime}>Arival</button>
              <button onClick={sortByDepartureTime}>Departure</button>
            </div>
            <ul>
              {isClicked ? (
                <Ticket
                  ele={el}
                  setIsClicked={setIsClicked}
                  isClicked={isClicked}
                />
              ) : (
                busApiData.map((ele) => {
                  return (
                    <li
                      className='api_data'
                      key={ele.id}
                      onClick={() => {
                        console.log(ele);
                        selectingSeats(ele);
                      }}
                    >
                      {console.log(isClicked)}

                      <div className='api__data_element_warpper'>
                        <div className='api_data_elements'>
                          <h4>Bus Name: </h4>
                          {ele.busName}
                        </div>
                        <div className='api_data_elements'>
                          <h4>Arival Time: </h4>
                          {ele.arrivalTime}
                        </div>
                        <div className='api_data_elements'>
                          <h4>Departure Time: </h4>
                          {ele.departureTime}
                        </div>
                        <div className='api_data_elements'>
                          <h4>Journey Date: </h4>
                          {ele.date}
                        </div>
                        <div className='api_data_elements'>
                          <h4>Price: </h4>
                          {ele.ticketPrice}/-
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        ) : <TitleComp />
        }
      </div>
    </>
  );
};

export default Search;
