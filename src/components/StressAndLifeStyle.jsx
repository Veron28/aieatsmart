import React,{useEffect, useState} from 'react'
import '../styles/stressAndLifeStyle.css'
import StressAndLifeStyleRaange from './commands/StressAndLifeStyleRaange'

const  StressAndLifeStyle = () => {

  const [left, setLeft] = useState(0)

  const onInputChange = (e) => {
    let value = e.target?.value
    setLeft(value)
  }


  const handleTouchEnd = (e) => {
   let value = e.target?.value
    if (value <= 10) {
      setLeft(0)
    } else if (value > 10 && value <= 30) {
      setLeft(20)
    } else if (value > 30 && value <= 50) {
      setLeft(40)
    } else if (value > 50 && value <= 70) {
      setLeft(60)
    } else if (value > 70 && value <= 90) {
      setLeft(80)
    } else {
      setLeft(100)
    }
  };
  return (
  <>
    <div className="sliderTitle">
      <h1 className="greeting">Стресс и образ жизни</h1>
      <h2 className="under_greeting">Расскажите нам больше о вашем рационе и распорядке дня:</h2>
    </div>
    <div>
      <StressAndLifeStyleRaange />
      <div className="range">
        <div className='title'>
          <div className='level_title'>Уровень активности</div>
          <div className='levels_name'>
            <div className = 'levels'
            style = {
              {
                top: left <= 10 ? '0px' :
                     left > 10 && left <= 30 ? '-32px' :
                     left > 30 && left <= 50 ? '-64px' :
                     left > 50 && left <= 70 ? '-96px' :
                     left > 70 && left < 90 ? '-128px' : ''
                     }
                 
                    // left === 20 ? '-32px' : left === 40 ? '-64px' : left === 60 ? '-96px' : left === 80 ? '-128px': '0px'
            } >
              <div className='level'>Минимальный</div>
              <div className='level'>Небольшой</div>
              <div className='level'>Умеренный</div>
              <div className='level'>Больше среднего</div>
              <div className='level'>Максимальный</div>
            </div>
          </div>
        </div>
          <div className="field">
              {
                left !== 0 &&(
                  <div className="value left"> 1</div>
                )
              }
              <input onTouchEnd={handleTouchEnd} onInput={(e) => onInputChange(e)} type="range" min="0" max="80" value={left} steps="1" />
              <div className='field_range-cirkule'></div>
              {
                left !== 80 &&(
              <div className="value right">5</div>
                )
              }
              <div className='line'>
                <div className='cirkul' style={
               {
                background: left <= 10 ? '#DBDBDB' : '#9C6AF9'
                }
            }></div>
                <div className='lin' style = {
               {
                background: left <= 10 ? '#DBDBDB' : '#9C6AF9'
                }
            }></div>
                <div className='cirkul'  style={
               {
                background: left <= 30 ? '#DBDBDB' : '#9C6AF9'
                }
            }></div>
                <div className='lin'  style={
               {
                background: left <= 30 ? '#DBDBDB' : '#9C6AF9'
                }
            }></div>
                <div className='cirkul'  style={
               {
                background: left <= 50 ? '#DBDBDB' : '#9C6AF9'
                }
            }></div>
                <div className='lin'  style={
               {
                background: left <= 50 ? '#DBDBDB' : '#9C6AF9'
                }
            }></div>
                <div className='cirkul' style={
               {
                background: left <= 70 ? '#DBDBDB' : '#9C6AF9'
                }
            }></div>
                <div className='lin' style={
               {
                background: left <= 70 ? '#DBDBDB' : '#9C6AF9'
                }
            }></div>
                <div className = 'cirkul' style={
               {
                background: left <= 90 ? '#DBDBDB' : '#9C6AF9'
                }
            }></div>
              </div>
            </div>
              <div className='info_text'>
            Выберите свой обычный уровень активности, <span style={{color: left <= 10 ? '#9C6AF9' :'#B7B7B7'}}>где 1 - минимальный</span>, а <span style={{color: left >= 80 ? '#9C6AF9' :'#B7B7B7'}}> 5 - максимальный</span>
          </div>
          </div>
    </div>
     <div className="additional-options">
      <div className="not-found">Не нашли в списке?</div>
      <textarea className="medical-conditions" placeholder="Введите здесь все имеющиеся медицинские противопоказания. Не более 600 символов"></textarea>
    </div>
     </>
  )
}

export default  StressAndLifeStyle