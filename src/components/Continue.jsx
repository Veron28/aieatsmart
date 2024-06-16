import React from 'react'
import Button from './commands/Button'
import '../styles/continue.css'

const Continue = ({step,onClick}) => {
  console.log('step', step)
  return (
    <div className='button_section'>
      {
        step === 7 ? 
          (
            <Button label = "Перейти в статистику"
              variante = 'standart_2'
              onClick = {
                onClick
              }
              step={step} 
              classN="button-container2" />
          ) : ''
      }
      <Button label = "Начать"
      variante = 'standart'
      icon = 'arrow'
      onClick = {
        onClick
      }
      step={step} / >
    </div>
  )
}

export default Continue