import React from 'react'
import chevronLeftSvg from '../assets/chevron.left.svg' 
import '../styles/button.css'

const Beck = ({step,onClick}) => {
  return (
    <div>
      {
        step !== 1 && <button className='beck_button' onClick={onClick}>
          <img src={chevronLeftSvg} />
          Назад
        </button> 
      }      
    </div>
  )
}

export default Beck