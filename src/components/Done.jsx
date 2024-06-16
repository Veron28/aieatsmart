import React from 'react'
import '../styles/done.css'
import Animation from './commands/Animation'

const Done = ({step}) => {
  return (
    <>
        <div className="sliderTitle">
            <h1 className="greeting">Готово</h1>
            <h2 className="under_greeting">Бонус уже ждет тебя в чате</h2></div>
        <div>
            <Animation step={step} />
        </div>
    </>
  )
}

export default Done