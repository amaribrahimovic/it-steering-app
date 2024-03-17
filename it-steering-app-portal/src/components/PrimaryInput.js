import React from 'react'

const PrimaryInput = ({type, placeholder, id, name, onChange, value}) => {
  return (
    <input type={type} placeholder={placeholder} id={id} name={name} onChange={onChange} value={value}/>
  )
}

export default PrimaryInput