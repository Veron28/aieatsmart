import React from 'react'
import '../../styles/button.css'
import arrow from '../../assets/right.svg'
import Vector from '../../assets/Vector.svg'

const Button = ({
        label,
        variante,
        icon,
        onClick ,
        step, 
        classN
    }) => {
  return (
    <>
                    <div className = {
                        `${classN} button-container`
                    } >
                    <div 
                        id= "buttonMain"
                        className = {
                            `${variante === 'standart' ? 'buttonMain' : 'buttonMain_2' }`
                        }
                        onClick = { variante === 'standart' && step === 7 ? null : variante !== 'standart' && step === 7 ?
                            onClick : onClick
                        } > {
                            step === 6 ? 'Готово' : step === 7 && variante === 'standart' ? 'Открыть чат' : step === 8 && variante === 'standart' ? 'Открыть чат':
                            label
                        }
                        {
                            step === 6 && icon === 'arrow' ?
                                <img src={Vector} alt="Icon" alt='img' className="button-icon" />
                                :
                            icon === 'arrow' ? 
                                <img src={arrow} alt="Icon" alt='img' className="button-icon" />
                            : <></>    
                            }
                        <div style = {
                            {
                                maxWidth: step > 1 && step < 6 ? (6 - step) * 15 + "%" : '100%',
                                opacity: step > 1 && step < 6 ? 1 : 0,
                            }
                        }
                        id = 'progres'
                        className = "progres" > </div>
                    </div>
                    <div id="progressMessage" className="progress-message">
                       { 
                       step === 1 || step === 7 || step === 8 ?
                         <></>
                         :
                         <>
                        Пройди ещё { 7 - step} этапа и получи бонус
                        </> }
                    </div>
                </div>
    </>
  )
}

export default Button