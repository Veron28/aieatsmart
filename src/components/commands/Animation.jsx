import React, { useEffect } from 'react'
import './animation.css'

const Animation = ({step}) => {

  useEffect(()=>{
    const c_3_img = document.querySelectorAll('.c_3 > div')
    let time = 0
    c_3_img.forEach((item) => {
      setTimeout(() => {
        item.style.display = 'flex'
      }, time * 1000)
      time += 0.2
    })
  },[])

  return (
      <div className="main_image">
            <div className="c_1">
              <div className="c_2">
                <div className="c_3">
                  {
                    step === 7 ?
                  <div className="c_3_img_8"></div>
                  :
                  <div className="c_3_img_1"></div>
                  }
                  <div className="c_3_img_2"></div>
                  <div className="c_3_img_3"></div>
                  <div className="c_3_img_4"></div>
                  <div className="c_3_img_5"></div>
                  <div className="c_3_img_6"></div>
                  <div className="c_3_img_7"></div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Animation