import React from 'react'
import './title.css'
import Bus from '../../asset/bus.png'
const TitleComp = ({ busApiData }) => {
  return (
    <div className='title_container'>
      <div className='title_para'>
        <p>BOOK YOUR BUSES WITH REDBUS</p>
      </div>
      <div className='title_img'>
        <img src={Bus} alt="bus" />
      </div>
    </div>

  )
}

export default TitleComp