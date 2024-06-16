import React,{useState} from 'react'
import '../styles/preferences.css'
import heartFill from '../assets/firstAnimationImages/heart-fill.png';
import meat from '../assets/meat.svg';
import vegetables from '../assets/vegetables.svg';
import srawberry from '../assets/srawberry.svg';
import potato from '../assets/potato.svg';
import paper from '../assets/paper.svg';
import maccoroni from '../assets/maccoroni.svg';
import macaronni2 from '../assets/macaronni2.svg';
import bread from '../assets/bread.svg';
import cabbage from '../assets/cabbage.svg';
import grechka from '../assets/grechka.svg';
import chesse from '../assets/chesse.svg';
import qiwi from '../assets/qiwi.svg';
import orange from '../assets/orange.svg';
import rice from '../assets/rice.svg';
import rchocolateice from '../assets/chocolate.svg';

const Preferences = () => {

    const [items, setItems] = useState([
        {
            id: 1,
            selected: false,
            icon: heartFill,
            img: meat,
            name: 'Говядина',
        },
        {
            id: 2,
            selected: false,
            icon: heartFill,
            img: vegetables,
            name: 'Овощи',
        },
        {
            id: 3,
            selected: false,
            icon: heartFill,
            img: srawberry,
            name: 'Клубника',
        },
        {
            id: 4,
            selected: false,
            icon: heartFill,
            img: potato,
            name: 'Картофель',
        },
        {
            id: 5,
            selected: false,
            icon: heartFill,
            img: paper,
            name: 'Перец',
        },
        {
            id: 6,
            selected: false,
            icon: heartFill,
            img: maccoroni,
            name: 'Спагетти',
        },
        {
            id: 7,
            selected: false,
            icon: heartFill,
            img: macaronni2,
            name: 'Макароны',
        },
        {
            id: 8,
            selected: false,
            icon: heartFill,
            img: bread,
            name: 'Хлеб',
        },
        {
            id: 9,
            selected: false,
            icon: heartFill,
            img: cabbage,
            name: 'Капуста',
        },
        {
            id: 10,
            selected: false,
            icon: heartFill,
            img: grechka,
            name: 'Крупа',
        },
        {
            id: 11,
            selected: false,
            icon: heartFill,
            img: chesse,
            name: 'Сыр',
        },
        {
            id: 12,
            selected: false,
            icon: heartFill,
            img: qiwi,
            name: 'Киви',
        },
        {
            id: 13,
            selected: false,
            icon: heartFill,
            img: orange,
            name: 'Цитрусовые',
        },
        {
            id: 14,
            selected: false,
            icon: heartFill,
            img: rice,
            name: 'Рис',
        },
        {
            id: 15,
            selected: false,
            icon: heartFill,
            img: rchocolateice,
            name: 'Шоколад',
        },
    ])

    const selectItem = (id) => {
        setItems(items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    selected: !item.selected
                }
            }
            return item
        }))
    }

  return (
    <>
    <div className="sliderTitle">
            <h1 className="greeting">Предпочтения</h1>
            <h2 className="under_greeting">Выберите продукты и блюда, которые вы
              предпочитаете употреблять:</h2>
          </div>
          <div>
              <div className = 'preference-cards' >
            {
                items.map((item)=>{
                     return(
                                <div key={item.id} className = {
                                    `preference-card ${item.selected ? 'selected' :''}`
                                }
                                onClick = {
                                    () => selectItem(item.id)
                                } >
                                    <div className='preference-card-img' >
                                        <img src={item.img} />
                                    </div>
                                    <div className="preference-card_img">
                                        <img src={item.icon} />
                                    </div>
                                    <div className="preference-title">{item.name}</div>
                                </div>
                    )
                    })
                    }
                </div>
            <div className="additional-options">
              <div className="not-found">Не нашли в списке?</div>
              <textarea className="medical-conditions"
                placeholder="Введите здесь все имеющиеся медицинские противопоказания. Не более 600 символов"></textarea>
            </div>
          </div>
          </>
  )
}

export default Preferences