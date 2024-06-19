import React, { useState } from 'react'
import vector from '../assets/firstAnimationImages/Vector.svg'
import icon_1 from '../assets/up.svg'
import icon_1_1 from '../assets/up2.svg'
import icon_2 from '../assets/down.svg'
import icon_2_1 from '../assets/down2.svg'
import icon_3 from '../assets/icon2.svg'
import icon_3_1 from '../assets/icon2_1.svg'
import icon_4 from '../assets/heart.svg'
import icon_4_1 from '../assets/heart2.svg'
import icon_5 from '../assets/run.svg'
import icon_5_1 from '../assets/run2.svg'
import '../styles/health.css'

const Purpose = ({onChangeData}) => {
    const [items,setItems] = useState([
        {
            id:1,
            selected:false,
            icon:icon_1,
            icon2:icon_1_1,
            img:vector,
            name: 'Набор массы',
        },
        {
            id:2,
            selected:false,
            icon:icon_2,
            icon2: icon_2_1,
            img:vector,
            name: 'Снижение веса',
        },
        {
            id:3,
            selected:false,
            icon:icon_3,
            icon2:icon_3_1,
            img:vector,
            name: 'Поддержание текущего веса',
        },
        {
            id:4,
            selected:false,
            icon:icon_4,
            icon2:icon_4_1,
            img:vector,
            name: 'Улучшение здоровья',
        },
        {
            id:5,
            selected:false,
            icon:icon_5,
            icon2:icon_5_1,
            img:vector,
            name: 'Улучшение спортивных результатов',
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
        onChangeData("goals", newDatan)
    }

  return (
    <>
    <div className="sliderTitle">
            <h1 className="greeting">Цели</h1>
            <h2 className="under_greeting">Выберите одну или несколько целей которые больше вам подходят:</h2>
          </div>
          <div>
            {
                items.map((i)=>{
                    return (
                      <label key = {i.id}
                      onClick={() => selectItem(i.id)}
                      className={`option medical_option_parent ${i.selected && 'medical_option_ck'}`}
                      id={`medical_option_${i.id}`} >
                        <img src={i.selected ? i.icon2 : i.icon} alt="Icon 5"/>
                        <span>{i.name}</span>
                        <div className={` ${i.selected ? 'item_checked_none' : 'medical_option_item'}`}></div>
                        <img className={` ${i.selected ? 'item_checked' : 'item_checked_none'}`} src={i.img}
                            alt="Icon" />
                    </label>
                    )
                })
            }
          </div>
          </>
  )
}

export default Purpose