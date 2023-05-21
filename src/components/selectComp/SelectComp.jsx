import React from 'react'

const SelectComp = ({ city, updateCity, formData, srcList }) => {


  return (
    <select className="select" name="source" onChange={updateCity} value={city === "source" ? formData.source : formData.destination}>
      <option></option>
      {
        srcList.length > 0 &&

        srcList.map((item) => {

          if (city === "source") {
            return (<option
              key={item.id + Math.random()}
              value={item.source.slice(0, 1).toUpperCase() + item.source.slice(1)}>
              {item.source.slice(0, 1).toUpperCase() + item.source.slice(1)}
            </option>)
          }
          if (city === 'destination') {
            return <option
              key={item.id + Math.random()}
              value={item.destination.slice(0, 1).toUpperCase() + item.destination.slice(1)}>
              {item.destination.slice(0, 1).toUpperCase() + item.destination.slice(1)}
            </option>
          }
        })
      }
    </select>
  )
}



export default SelectComp