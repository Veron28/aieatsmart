import React,{useEffect, useState,useRef} from 'react'
import '../styles/stressAndLifeStyle.css'
import StressAndLifeStyleRaange from './commands/StressAndLifeStyleRaange'

const  StressAndLifeStyle = ({onChangeData}) => {

   const [left, setLeft] = useState(0)
  const [value, setValue] = useState(1)
  const valueBubbleRef = useRef(null);


  const handleSliderChange = (e) => {
    let value = e.target.value
    setLeft(value)
    if (value <= 20) {
      setValue(1)
    } else if (value > 20 && value <= 40) {
      setValue(2)
    } else if (value > 40 && value <= 60) {
      setValue(3)
    } else if (value > 60 && value <= 80) {
      setValue(4)
    } else {
      setValue(5)
    }
  }

  useEffect(() => {
    updateBubblePosition()
  }, [left])

  const updateBubblePosition = () => {
    const newValue = Number((left) * 100 / (100 - 0));
    const newPosition = 14 - (newValue * 0.4);
    if (valueBubbleRef.current) {
      valueBubbleRef.current.style.left = `calc(${newValue}% + (${newPosition}px))`;
    }
    if (left === 0) {
      valueBubbleRef.current.style.left = '0'
    }
  };

  const handleTouchEnd = (e) => {
    let stressLevel = 1;
    let valueN = e.target?.value
    if (valueN < 12) {
      setLeft(0)
      stressLevel = 1;
      setValue(1)
    } else if (valueN > 12 && valueN <= 20) {
      setLeft(20)
      stressLevel = 2;
      setValue(2)
    } else if (valueN > 20 && valueN <= 35) {
      setLeft(20)
      stressLevel = 2;
      setValue(2)
    } else if (valueN > 35 && valueN <=50) {
      setLeft(50)
      stressLevel = 3;
      setValue(3)
    } else if (valueN > 50 && valueN <= 60) {
      setLeft(50)
      stressLevel = 3;
      setValue(3)
    }else if (valueN > 60 && valueN <= 75) {
      setLeft(75)
      stressLevel = 4;
      setValue(4)
    }else if (valueN > 75 && valueN <= 85) {
      setLeft(75)
      stressLevel = 4;
      setValue(4)
    } else {
      setLeft(100)
      stressLevel = 5;
      setValue(5)
    }
    onChangeData('stressLevel', stressLevel)
  };


  return (
  <>
    <div className="sliderTitle">
      <h1 className="greeting">Стресс и образ жизни</h1>
      <h2 className="under_greeting">Расскажите нам больше о вашем рационе и распорядке дня:</h2>
    </div>
    <div>
      <StressAndLifeStyleRaange onChangeData={onChangeData} />
 <div className="range">
      <div className='title'>
        <div className='level_title'>Уровень стреса</div>
        <div className='levels_name'>
          <div className='levels'
            style={
              {
                top: left <= 10 ? '0px' :
                  left > 10 && left <= 30 ? '-32px' :
                    left > 30 && left <= 50 ? '-64px' :
                      left > 50 && left <= 70 ? '-96px' :
                        left > 70 && left < 90 ? '-128px' : ''
              }
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
        <div className='slider'>
          {
            (
              <div className="value left" style={
                {
                  opacity: left > 10 ? 1 : 0
                }
              } > 1</div>
            )
          }
          <div className='slider-input'>
            <input onTouchEnd={handleTouchEnd} onChange={handleSliderChange} type="range" min="0" max="100" value={left} step={1} />
            <div ref={valueBubbleRef} className='field_range-cirkule'>{value}</div>
          </div>
          {
            (
              <div className="value right" style={
                {
                  opacity: left > 85 ? 0 : 1
                }
              }>5</div>
            )
          }
          </div>
        <div className='line'>
          <div className='cirkul' style={
            {
              background: left < 15 ? '#DBDBDB' : '#9C6AF9'
            }
          }></div>
          <div className='lin' style={
            {
              background: left < 15 ? '#DBDBDB' : '#9C6AF9'
            }
          }></div>
          <div className='cirkul' style={
            {
              background: left <= 40 ? '#DBDBDB' : '#9C6AF9'
            }
          }></div>
          <div className='lin' style={
            {
              background: left <= 40 ? '#DBDBDB' : '#9C6AF9'
            }
          }></div>
          <div className='cirkul' style={
            {
              background: left <= 60 ? '#DBDBDB' : '#9C6AF9'
            }
          }></div>
          <div className='lin' style={
            {
              background: left <= 60 ? '#DBDBDB' : '#9C6AF9'
            }
          }></div>
          <div className='cirkul' style={
            {
              background: left <= 90 ? '#DBDBDB' : '#9C6AF9'
            }
          }></div>
          <div className='lin' style={
            {
              background: left <= 90 ? '#DBDBDB' : '#9C6AF9'
            }
          }></div>
          <div className='cirkul' style={
            {
              background: left <= 90 ? '#DBDBDB' : '#9C6AF9'
            }
          }></div>
        </div>
      </div>
      <div className='info_text'>
        Выберите свой обычный уровень активности, <span style={{ color: left <= 10 ? '#9C6AF9' : '#B7B7B7' }}>где 1 - минимальный</span>, а <span style={{ color: left >= 80 ? '#9C6AF9' : '#B7B7B7' }}> 5 - максимальный</span>
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