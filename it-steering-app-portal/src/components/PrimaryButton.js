import React from 'react'

const PrimaryButton = ({children, onClick}) => {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

export default PrimaryButton