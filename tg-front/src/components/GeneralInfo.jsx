import React from 'react'
import '../styles/generalInfo.css'
import downArrow from '../assets/down-arrow-svgrepo-com.svg'

const GeneralInfo = ({
  onChangeData,
    openPopupButton1,
    openPopupButton2, 
    openPopupButton3,
    }) => {
  return (
    <div>
        <h1 className="greeting">Основное</h1>
          <h2 className="under_greeting">Чем больше мы о вас знаем, тем лучше мы
            сможем вам помочь:</h2>
          <div className="option1">
            <span>Пол:</span>
            <select id = "gender"
            name = "gender"
            onChange={(e)=>onChangeData('gender',e.target.value)} >
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </div>
          <div className = "option1"
          onClick = {openPopupButton1} >
            <span>Вес:</span>
            <div>
              <span id="weight">Выберите вес</span>
              <img alt='img'  src={downArrow} />
            </div>
          </div>
          <div onClick ={openPopupButton2}
          className = "option1"
          id = "openPopupButton_2" >
            <span>Рост:</span>
            <div>
              <span id="height">Выберите рост</span>
              <img alt='img' src={downArrow} />
            </div>
          </div>
          <div onClick = {openPopupButton3}
          className = "option1"
          id = "openPopupButton_3" >
            <span>Возраст:</span>
            <div>
              <span id="age">Выберите возраст</span>
              <img alt='img' src={downArrow} />
            </div>
          </div>
    </div>
  )
}

export default GeneralInfo