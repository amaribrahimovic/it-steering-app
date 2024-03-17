import React from 'react'

const PrimaryTextArea = ({rows, columns, placeholder, id, name, onChange, value}) => {
  return (
    <textarea rows={rows} columns={columns} placeholder={placeholder} id={id} name={name} onChange={onChange} value={value}/>
  )
}

export default PrimaryTextArea