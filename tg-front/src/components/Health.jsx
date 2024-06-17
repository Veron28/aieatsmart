import React, { useState } from 'react'
import vector from '../assets/firstAnimationImages/Vector.svg'
import icon_1 from '../assets/icon1.svg'
import icon_1_1 from '../assets/icon_1_1.svg'
import icon_2 from '../assets/icon2.svg'
import icon_2_1 from '../assets/icon_2_1.svg'
import icon_3 from '../assets/icon3.svg'
import icon_3_1 from '../assets/icon_3_1.svg'
import icon_4 from '../assets/icon4.svg'
import icon_4_1 from '../assets/icon_4_1.svg'
import icon_5 from '../assets/icon5.svg'
import icon_5_1 from '../assets/icon_5_1.svg'
import '../styles/health.css'

const Health = ({onChangeData}) => {
    const [items,setItems] = useState([
        {
            id:1,
            selected:false,
            icon:icon_1,
            icon2:icon_1_1,
            img:vector,
            name: 'Диабет',
        },
        {
            id:2,
            selected:false,
            icon:icon_2,
            icon2:icon_2_1,
            img:vector,
            name: 'Ожирение',
        },
        {
            id:3,
            selected:false,
            icon:icon_3,
            img:vector,
            icon2: icon_3_1,
            name: 'Гипертония',
        },
        {
            id:4,
            selected:false,
            icon:icon_4,
            icon2: icon_4_1,
            img:vector,
            name: 'Сердечные заболевания',
        },
        {
            id:5,
            selected:false,
            icon:icon_5,
            img:vector,
            icon2: icon_5_1,
            name: 'Аллергия',
        },
    ])
    const selectItem = (id) => {
        const newDatan = []
        setItems(items.map((item)=>{
            if(item.id === id){
                if (!item.selected){    
                    newDatan.push(item.name)
                }
                return {
                    ...item,
                    selected: !item.selected
                }
            }
             if (item.selected) {
                 newDatan.push(item.name)
             }
            return item
        }))
        onChangeData("health", newDatan)
    }

  return (
    <>
    <div className="sliderTitle">
            <h1 className="greeting">Здоровье</h1>
            <h2 className="under_greeting">Пожалуйста, укажите все имеющиеся у вас
              медицинские противопоказания:</h2>
          </div>
          <div >
            {
                items.map((i)=>{
                    return (
                      <label key = {i.id}
                      onClick={() => selectItem(i.id)}
                      className={`option medical_option_parent ${i.selected && 'medical_option_ck'}`}
                      id = "medical_option_5" >
                        <img src={i.selected ? i.icon2 : i.icon} alt="Icon 5"/>
                        <span>{i.name}</span>
                        <div className={` ${i.selected ? 'item_checked_none' : 'medical_option_item'}`}></div>
                        <img className={` ${i.selected ? 'item_checked' : 'item_checked_none'}`} src={i.img}
                            alt="Icon" />
                    </label>
                    )
                })
            }
            

            <div className="additional-options">
              <div className="not-found">Не нашли в списке?</div>
              <textarea className="medical-conditions"
                placeholder="Введите здесь все имеющиеся медицинские противопоказания. Не более 600 символов"></textarea>
            </div>
          </div>
          </>
  )
}

export default Health