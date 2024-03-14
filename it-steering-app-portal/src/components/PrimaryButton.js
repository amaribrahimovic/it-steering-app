import React from 'react'

const PrimaryButton = ({children, classNameTmp, onClick}) => {
  return (
    <button className={classNameTmp} onClick={onClick}>{children}</button>
  )
}

export default PrimaryButton