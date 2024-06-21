import React from 'react'
import '../styles/stepRow.css'

import Vector9 from '../assets/firstAnimationImages/Vector9.svg'
import Vector10 from '../assets/firstAnimationImages/Vector10.svg'
import Vector11 from '../assets/firstAnimationImages/Vector11.svg'
import Vector12 from '../assets/firstAnimationImages/Vector12.svg'
import Vector13 from '../assets/firstAnimationImages/Vector13.svg'

const StepRow = ({step}) => {

  return (
    <div className="steps_row">
        <div className="steps" id="steps">
          {
            step < 7 ?(<>
              <div className={` steps_item ${step === 2 ? 'steps_item_active': step > 2 ?'steps_item_active_2' : ''}`} ></div>
              <div className={` steps_item ${step === 3 ? 'steps_item_active': step > 3 ?'steps_item_active_2' : ''}`} ></div>
              <div className={` steps_item ${step === 4 ? 'steps_item_active': step > 4 ?'steps_item_active_2' : ''}`} ></div>
              <div className={` steps_item ${step === 5 ? 'steps_item_active': step > 5 ?'steps_item_active_2' : ''}`} ></div>
              <div className={` steps_item ${step === 6 ? 'steps_item_active': ''}`} ></div>
            </>
            )
            : <></>
          }
        </div>
        { step < 7 ?
        <div className="steps_row_icon" id="steps_row_icon">
            {
            step === 2 ?
                 <img id="steps_row_icon_img" alt='img'  src={Vector9} />
            :
            step === 3 ?
                 <img id="steps_row_icon_img" alt='img'  src={Vector10} />
            :
             step === 4 ?
                 <img id="steps_row_icon_img" alt='img'  src={Vector11} />
            :
            step === 5 ?
                <img id="steps_row_icon_img"  alt='img' src={Vector12} />
            :
             step === 6 ? 
                 <img id="steps_row_icon_img"  alt='img' src={Vector13} />
                : <></>
            }          
        </div>
        :<></>}
      </div>
  )
}

export default StepRow