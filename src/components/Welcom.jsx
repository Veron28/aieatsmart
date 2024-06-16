import React, { useEffect, useState } from 'react'
import Beck from './Beck'
import Continue from './Continue'
import '../styles/welcome.css'
import Animation from './commands/Animation'
import StepRow from './StepRow'
import GeneralInfo from './GeneralInfo.jsx'
import Popaps from './Popaps.jsx'
import Health from './Health.jsx'
import Purpose from './Purpose.jsx'
import Preferences from './Preferences.jsx'
import Done from './Done.jsx'
import Statistic from './Statistic.jsx'
import StressAndLifeStyle from './StressAndLifeStyle.jsx'
import axios from 'axios'

const Welcom = () => {
  const [step, setStep] = useState(1)
  const [showpopUp1, setShowpopUp1] = useState(false)
  const [showpopUp2, setShowpopUp2] = useState(false)
  const [showpopUp3, setShowpopUp3] = useState(false)
  const [loading, setLoafing] = useState(false)
  const [token,setToken] = useState('')
  const [newUserIsAdded, setNewUserIsAdded] = useState(false)
  const [statisticInfo, setStatisticInfo] = useState({})

  const [dataForNewUser, setDataForNewUser] = useState({
    gender: "male",
    weight: '',
    height: '',
    age: '',
    health: [''],
    goals: [''],
    preferences: [''],
    activityLevel: 1,
    stressLevel: 1,
  })

  const onChangeData = (type,value) =>{
    setDataForNewUser({
      ...dataForNewUser,
      [`${type}`] : value
    })
  }

  useEffect(()=>{
    getStatisticInfo('%7B%22id%22%3A963717429%2C%22first_name%22%3A%22Mher%22%2C%22last_name%22%3A%22Janikyan%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=2702432507875626646&chat_type=private&auth_date=1718557604&hash=f54fb30841a05211b7fe30de5ca845881094f94ab0ba3bf11ec3c558e8826c64')
    if(step === 7){
      addUser(token)
    }
  }, [dataForNewUser])

  const addUser = async (initData) => {
    if(!newUserIsAdded){
      const headers = {
        'Authorization': `Bearer ${initData}`
      }
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/add_user_data`, {dataForNewUser}, headers)
      setNewUserIsAdded(true)
    }
  }


  const getUser = async (initData) => {
    const headers = {
      'Authorization': `Bearer ${initData}`
    }
   const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/is_auth`, {}, headers)
   
   if (data.status){
   await getStatisticInfo(initData)
    setStep(8)
  }

  setLoafing(false)
  }


  const getStatisticInfo = async (initData) => {
    if(!newUserIsAdded){
      const headers = {
        'Authorization': `Bearer ${initData}`
      }
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/get_stat`, {dataForNewUser}, headers)
      setStatisticInfo(data)
    }
  }

  useEffect(() => {
   const initTelegram = () => {
     if (typeof window.Telegram !== 'undefined' && typeof window.Telegram.WebApp !== 'undefined') {
       window.Telegram.WebApp.expand();
       let initData = window.Telegram.WebApp.initData || '';
       setToken(initData)
       let initDataUnsafe = window.Telegram.WebApp.initDataUnsafe || {};
       window.Telegram.WebApp.setBackgroundColor('#EFEEF4');
       window.Telegram.WebApp.ready();
      //  getUser(initData)
     }
   };

   if (typeof window.Telegram === 'undefined') {
     const script = document.createElement('script');
     script.src = 'https://telegram.org/js/telegram-web-app.js';
     script.onload = initTelegram;
     document.head.appendChild(script);
   } else {
     initTelegram();
   }
 }, []);


  const onClickNextStep = ()=>{
    if (step <8){
      setStep(step + 1)
    }
  }
  const onClickBeckStep = () => {
    if(step >0){
      setStep(step - 1)
    }
  }

  const openPopupButton1 = () =>{
    setShowpopUp1(!showpopUp1)
  }
  const openPopupButton2 = () => {
    setShowpopUp2(!showpopUp2)
  }
  const openPopupButton3 = () => {
    setShowpopUp3(!showpopUp3)
  }
  
  const cloasePop = () => {
      setShowpopUp1(false)
      setShowpopUp2(false)
      setShowpopUp3(false)
  }


  const showContetn = ()=>{
        if (step === 1) {
    return (
      <>
      <div className="sliderTitle">
          <h1 className="greeting">Добро</h1>
          <h1 className="greeting">пожаловать</h1>
          <h2 className="under_greeting">Это <span
              className = 'purple_text'>EatSmart</span>,
          твой личный ИИ-гуру питания</h2>
      </div>
       <Animation / >
      </>)
    }
    else if(step === 2){
      return (
      <>
        <StepRow step={step} />
        <GeneralInfo 
        onChangeData={onChangeData}
        openPopupButton1={openPopupButton1} 
        openPopupButton2={openPopupButton2} 
        openPopupButton3={openPopupButton3} / >
      </>
     )
    }
    else if(step === 3){
      return (
      <>
        <StepRow  step={step} />
        <Health onChangeData={onChangeData} />
      </>
     )
    }
    else if(step === 4){
      return (
      <>
        <StepRow step={step} />
        <Purpose  onChangeData={onChangeData}/>
      </>
     )
    }
    else if(step === 5){
      return (
      <>
        <StepRow step={step} />
        <Preferences  onChangeData={onChangeData} />
      </>
     )
    }
    else if(step === 6){
      return (
      <>
        <StepRow step={step} />
        <StressAndLifeStyle onChangeData={onChangeData} />
      </>
     )
    }
    else if(step === 7){
      return (
      <>
        <StepRow step={step} />
        <Done step={step} />
      </>
     )
    }
    else if(step === 8){
      return (
      <>
        <StepRow step={step} />
        <Statistic statisticInfo={statisticInfo} />
      </>
     )
    }

    else{
      return <></>
    }
  }

  return (
    <div className='article'>
      {
        !loading ? (
        <>
        <div>
            <Beck step={step} onClick={onClickBeckStep} />
           {
             showContetn()
           }
        </div>
        <Continue step={step} onClick={onClickNextStep}/>
       <Popaps onChangeData={onChangeData} showpopUp1={showpopUp1} showpopUp2={showpopUp2} showpopUp3={showpopUp3} cloasePop={cloasePop} />
       </>
        ) : <></>
      }
        
    </div>
  )
}

export default Welcom