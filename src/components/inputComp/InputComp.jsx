import React from 'react'

const InputComp = ({ toOrFrom, element, err }) => {
  return (
    <div className='inp__container'>
      {toOrFrom && <span>{toOrFrom}</span>}
      {element}

      {err.errSrc && <div className='err__msg'>Please fill input fields</div>}
    </div>
  )
}

export default InputComp