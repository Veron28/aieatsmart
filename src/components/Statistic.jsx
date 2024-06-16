import React, { useEffect, useState } from 'react'
import '../styles/statistic.css'
import cakeFill from '../assets/firstAnimationImages/cake-fill.png'
import scalesFill from '../assets/firstAnimationImages/scales-fill.png'
import DashboardApp from './DashboardApp'

const Statistic = () => {
    const [kkl_1, setKkl_1] = useState(319)
    const [gr_1, setGr_1] = useState(210)
    const [kkl_2, setKkl_2] = useState(425)
    const [gr_2, setGr_2] = useState(210)
    const [kkl_3, setKkl_3] = useState(920)
    const [gr_3, setGr_3] = useState(1870)

    const [sum, setSume] = useState(kkl_1 + kkl_2 + kkl_3)
    const kkl_1Pr = Math.floor((100 * kkl_1) / sum);
    const kkl_2Pr = Math.floor((100 * kkl_2) / sum);
    const kkl_3Pr = Math.floor((100 * kkl_3) / sum);
    const [meals_all, setMeals_all] = useState(3)
    const [meals_curent, setMeals_curent] = useState(3)
    const [eaten_gr, setEaten_gr] = useState('2,250')
    const [left, setLeft] = useState('230')

    

  return (
     <>
        <div className="sliderTitle">
            <h1 className="greeting">Статистика</h1>
            <h2 className = "under_greeting" > За сегодня</h2></div>
        <div>
            <div className="j_1">
            <div className="j_1_ypr">
              <div className="j_1_y" id="j_1_y" style={{height:kkl_1Pr + '%'}}></div>
              <div className="j_1_p" id="j_1_p" style={{height:kkl_2Pr + '%'}}></div>
              <div className="j_1_r" id="j_1_r" style={{height:kkl_3Pr + '%'}}></div>
            </div>
            <div className="j_1_ypr j_1_ypr_2">
              <div className="j_1_ypr">
                <div className="c_text">
                  <div className="c_text_1"></div>
                  <h3>Жиры</h3>
                </div>
                <h4 className="c_text_h3" id="kkl_j_1">{kkl_1} ккал, {gr_1} гр</h4>
              </div>
              <div className="j_1_ypr j_1_yp_2">
                <div className="c_text">
                  <div className="c_text_2"></div>
                  <h3>Углеводы</h3>
                </div>
                <h4 className="c_text_h3" id="kkl_j_2">{kkl_2} ккал, {gr_2} гр</h4>
              </div>
              <div className="j_1_ypr j_1_yp_2 ">
                <div className="c_text">
                  <div className="c_text_3"></div>
                  <h3>Белки</h3>
                </div>
                <h4 className="c_text_h3" id="kkl_j_3">{kkl_3} ккал, {gr_3} гр</h4>
              </div>
            </div>
          </div>
          <div className="j_2">
            <div className="j_2_i">
              <div className="j_2_i_c">
                <img src={cakeFill} />
              </div>
              <div className="j_2_i_text">
                <h2 id="meals_all">{meals_all}</h2>
                <p id="meals_curent">из {meals_curent}</p>
              </div>
              <p>Приема пищи</p>
            </div>
            <div className="j_2_i">
              <div className="j_2_i_c">
                <img src={scalesFill} />
              </div>
              <div className="j_2_i_text">
                <h2 id="eaten">{eaten_gr}</h2>
                <p>гр</p>
              </div>
              <p>Съедено</p>
            </div>
          </div>
          <div className="j_3">
            <div className="j_3_text">
              <div className="j_2_i_text">
                <h2 id='left'>{left}</h2>
                <p>ккал</p>
              </div>
              <p>Осталось</p>
            </div>
          <DashboardApp />
          </div>
        </div>
    </>
  )
}

export default Statistic