import React, { useState, useContext, useEffect } from "react";
import { BsArrowLeftRight } from "react-icons/bs";
import "./search.css";
import TitleComp from "../title/TitleComp";
import Ticket from "../ticket/Ticket";
import ContextData from "../../store/context-data";
import SelectComp from "../selectComp/SelectComp";
import InputComp from "../inputComp/InputComp";


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
  const [searchBtn, setSearchBtn] = useState(false)

  const [srcList, setSrcList] = useState([]);


  useEffect(() => {
    const getSrcList = async () => {
      const data = await fetch("https://content.newtonschool.co/v1/pr/63b70222af4f30335b4b3b9a/buses")
      const json = await data.json()

      setSrcList(json)
    }
    getSrcList()
  }, [])


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
    if (busApiData.length < 1) {
      setSearchBtn(true)
    } else {
      setSearchBtn(false)
    }
  }

  function sortByPrice() {
    let newApidata = [...busApiData];
    newApidata.sort(function (a, b) {
      return Number(a.ticketPrice) - Number(b.ticketPrice);
    });

    setBusApiData(newApidata);
    console.log(busApiData);
  }

  function sortByTime(time) {
    let newBusData = [...busApiData]
    newBusData.sort(function (a, b) {
      if (time === "arrivalTime") {
        if (a.arrivalTime > b.arrivalTime) return 1;
        if (a.arrivalTime < b.arrivalTime) return -1;
        return 0;
      }
      if (time === "departureTime") {
        if (a.departureTime < b.departureTime) return 1;
        if (a.departureTime > b.departureTime) return -1;
        return 0;
      }
    });
    setBusApiData(newBusData);

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

          <InputComp
            toOrFrom="FROM"
            element={
              <SelectComp
                city="source"
                updateCity={getSource}
                formData={formData}
                srcList={srcList}
              />
            }
            err={err.errSrc} />

          <InputComp
            element={
              <button className='switch' onClick={alterInput}>
                <BsArrowLeftRight fontWeight={600} />
              </button>
            }
            err={false} />



          <div className='inp__container'>
            <span>TO</span>
            <SelectComp city="destination" updateCity={getDestination} formData={formData} srcList={srcList} />
          </div>

          <div className='inp__container'>
            <span>DATE</span>
            <input type='date' value={formData.date} onChange={getTravelDate} />
          </div>

          <div className='inp__container'>
            <button
              className='search__btn'
              type='submit'
              onClick={checkAvailability}>
              SEARCH BUSES
            </button>
          </div>
        </form>

        {searchBtn && busApiData.length < 1 ? <div className='no_data'>No Bus Available</div> : null}
        {busApiData.length > 0 ? (
          <div className='ul_api'>

            <div className='sorting'>
              <h4>Sort By:</h4>
              <button onClick={sortByPrice}>Price</button>
              <button onClick={() => {
                sortByTime("arrivalTime")
              }}>
                Arival
              </button>
              <button onClick={() => {
                sortByTime("departureTime")
              }}>
                Departure
              </button>
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

                        selectingSeats(ele);
                      }}
                    >


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
        ) : <TitleComp busApiData={busApiData} />
        }
      </div>
    </>
  );
};

export default Search;
