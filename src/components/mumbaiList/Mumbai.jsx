import React from 'react'

const Mumbai = ({mumbai}) => {
    let filterdata = mumbai.filter((e)=>{
        return e.source==="mumbai" || e.destination==="mumbai"

    })
    console.log(filterdata)
  return (
    <ul>
        {filterdata.map((e)=>{
           return <li>{e.busName}</li>
        })}
    </ul>
    
  )
}

export default Mumbai;