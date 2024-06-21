import React, { useState } from 'react'
import '../styles/statistic.css'
import cakeFill from '../assets/firstAnimationImages/cake-fill.png'
import scalesFill from '../assets/firstAnimationImages/scales-fill.png'
import DashboardApp from './DashboardApp'

const Statistic = ({statisticInfo}) => {
    const [gr_1] = useState(statisticInfo?.stat?.fats ? statisticInfo?.stat?.fats : '')
    const [gr_2] = useState(statisticInfo?.stat?.carbohydrates ? statisticInfo?.stat?.carbohydrates :'')
    const [gr_3] = useState(statisticInfo?.stat?.squirrels ?  statisticInfo?.stat?.squirrels : '')

    const [sum] = useState(gr_1 + gr_2 + gr_3)
    const kkl_1Pr = Math.floor((100 * gr_1) / sum);
    const kkl_2Pr = Math.floor((100 * gr_2) / sum);
    const kkl_3Pr = Math.floor((100 * gr_3) / sum);
    const [meals_all] = useState(statisticInfo?.stat?.meals?.current ? statisticInfo?.stat?.meals?.current :'')
    const [meals_curent] = useState(statisticInfo?.stat?.meals?.total ? statisticInfo?.stat?.meals?.total : '')
    const [eaten_gr] = useState(statisticInfo?.stat?.eaten ? statisticInfo?.stat?.eaten : '')
    const [left] = useState(statisticInfo?.stat?.left ? statisticInfo?.stat?.left : '')


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
                <h4 className="c_text_h3" id="kkl_j_1">{gr_1} гр</h4>
              </div>
              <div className="j_1_ypr j_1_yp_2">
                <div className="c_text">
                  <div className="c_text_2"></div>
                  <h3>Углеводы</h3>
                </div>
                <h4 className="c_text_h3" id="kkl_j_2">{gr_2} гр</h4>
              </div>
              <div className="j_1_ypr j_1_yp_2 ">
                <div className="c_text">
                  <div className="c_text_3"></div>
                  <h3>Белки</h3>
                </div>
                <h4 className="c_text_h3" id="kkl_j_3">{gr_3} гр</h4>
              </div>
            </div>
          </div>
          <div className="j_2">
            <div className="j_2_i">
              <div className="j_2_i_c">
                <img src={cakeFill} alt='img' />
              </div>
              <div className="j_2_i_text">
                <h2 id="meals_all">{meals_all}</h2>
                <p id="meals_curent">из {meals_curent}</p>
              </div>
              <p>Приема пищи</p>
            </div>
            <div className="j_2_i">
              <div className="j_2_i_c">
                <img src={scalesFill} alt='img' />
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