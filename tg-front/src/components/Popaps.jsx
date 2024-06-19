import React, { useEffect, useRef, useState } from 'react';

const Popaps = ({ onChangeData,showpopUp1, showpopUp2, showpopUp3, cloasePop }) => {
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedWeight2, setSelectedWeight2] = useState(null);
  const [selectedWeight3, setSelectedWeight3] = useState(null);
  const [selectedWeight4, setSelectedWeight4] = useState(null);
  const [selectedWeight5, setSelectedWeight5] = useState(null);
  const [kg, setKg] = useState('kg');

  const weightPickerRef = useRef();
  const weightPicker2Ref = useRef();
  const weightPicker21Ref = useRef();
  const weightPicker22Ref = useRef();
  const weightPicker31Ref = useRef();


  const onChangeKg = (e) =>{
    setKg(e.target.value)
  }

  useEffect(() => {
    const initializePickers = () => {
      if (weightPickerRef.current) {
        populatePicker(weightPickerRef.current, 46, 253, [50, 250]);
      }
      if (weightPicker21Ref.current) {
        populatePicker(weightPicker21Ref.current, 46, 253, [50, 250]);
      }
      if (weightPicker31Ref.current) {
        populatePicker(weightPicker31Ref.current, 12, 79, [16, 75]);
      }
      if (weightPicker2Ref.current || weightPicker22Ref.current) {
        populatePickerDual(weightPicker2Ref.current, weightPicker22Ref.current, -3, 13, [0, 9]);
      }
    };

    const populatePicker = (picker, start, end, skipRange) => {
      for (let i = start; i <= end; i++) {
        const weightOption = document.createElement('div');
        if (i >= skipRange[0] && i <= skipRange[1]) {
          weightOption.textContent = `${i}`;
          weightOption.dataset.value = i;
        }
        picker.appendChild(weightOption);
      }
    };

    const populatePickerDual = (picker1, picker2, start, end, skipRange) => {
      for (let i = start; i <= end; i++) {
        const weightOption1 = document.createElement('div');
        const weightOption2 = document.createElement('div');
        if (i >= skipRange[0] && i <= skipRange[1]) {
          weightOption1.textContent = `${i}`;
          weightOption1.dataset.value = i;
          weightOption2.textContent = `${i}`;
          weightOption2.dataset.value = i;
        }
        picker1?.appendChild(weightOption1);
        picker2?.appendChild(weightOption2);
      }
    };

    const updateSelection = () => {
      setSelectedWeight(getClosestItem(weightPickerRef.current));
      setSelectedWeight2(getClosestItem(weightPicker2Ref.current));
      setSelectedWeight3(getClosestItem(weightPicker21Ref.current));
      setSelectedWeight4(getClosestItem(weightPicker22Ref.current));
      setSelectedWeight5(getClosestItem(weightPicker31Ref.current));
    };

    const getClosestItem = (picker) => {
      if (!picker) return null;
      const rect = picker.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const items = Array.from(picker.children);
      let closest = null;
      let minDiff = Infinity;

      items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const diff = Math.abs(center - itemCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closest = item;
        }
      });
      if (closest) {
        items.forEach(item => item.classList.remove('selected'));
        closest.classList.add('selected');
        return closest.dataset.value;
      }
      return null;
    };

    initializePickers();
    updateSelection();

    if (weightPickerRef.current) {
      weightPickerRef.current.addEventListener('scroll', updateSelection);
    }
    if (weightPicker2Ref.current) {
      weightPicker2Ref.current.addEventListener('scroll', updateSelection);
    }
    if (weightPicker21Ref.current) {
      weightPicker21Ref.current.addEventListener('scroll', updateSelection);
    }
    if (weightPicker22Ref.current) {
      weightPicker22Ref.current.addEventListener('scroll', updateSelection);
    }
    if (weightPicker31Ref.current) {
      weightPicker31Ref.current.addEventListener('scroll', updateSelection);
    }

    return () => {
      if (weightPickerRef.current) {
        weightPickerRef.current.removeEventListener('scroll', updateSelection);
      }
      if (weightPicker2Ref.current) {
        weightPicker2Ref.current.removeEventListener('scroll', updateSelection);
      }
      if (weightPicker21Ref.current) {
        weightPicker21Ref.current.removeEventListener('scroll', updateSelection);
      }
      if (weightPicker22Ref.current) {
        weightPicker22Ref.current.removeEventListener('scroll', updateSelection);
      }
      if (weightPicker31Ref.current) {
        weightPicker31Ref.current.removeEventListener('scroll', updateSelection);
      }
    };
  }, [showpopUp1, showpopUp2, showpopUp3]);

  const handleConfirm = () => {
    if (selectedWeight && selectedWeight2) {
      document.getElementById('weight').innerText = Number(selectedWeight + '.' + selectedWeight2) + kg;
      onChangeData('weight', Number(selectedWeight + '.' + selectedWeight2) + kg)
    }
    cloasePop();
  };

  const handleConfirm2 = () => {
    if (selectedWeight3 && selectedWeight4) {
      document.getElementById('height').innerText = Number(selectedWeight3 + '.' + selectedWeight4) + 'см';
      onChangeData('height', Number(selectedWeight3 + '.' + selectedWeight4) + 'см')
    }
    cloasePop();
  };

  const handleConfirm3 = () => {
    if (selectedWeight5) {
      document.getElementById('age').innerText = Number(selectedWeight5) + 'лет';
      onChangeData('age', Number(selectedWeight5) + 'лет')
    }
    cloasePop();
  };

  return (
    <>
      {showpopUp1 && (
        <>
          <div className="overlay" id="overlay"></div>
          <div className="popup" id="weightPopup">
            <div className="popup-header">
              <h3>Ваш вес</h3>
            </div>
            <div className="option_1">
              <select id="gender_1" name="gender_1" onChange={onChangeKg}>
                <option value="кг">Килограммы</option>
                <option value="фу">Фунты</option>
              </select>
            </div>
            <div className="weight-picker-section">
              <div className="weight-picker-container">
                <div id="weightPicker" className="weight-picker" ref={weightPickerRef}></div>
                <div className="highlight"></div>
              </div>
              <div className="comma">
                <span>,</span>
              </div>
              <div className="weight-picker-container">
                <div id="weightPicker_2" className="weight-picker" ref={weightPicker2Ref}></div>
                <div className="highlight_2"></div>
              </div>
              <div className="comma" id="comma_type">
                <span>{kg}</span>
              </div>
            </div>
            <div className="buttons">
              <button id="cancelButton" className="cancel_button" onClick={cloasePop}>Отмена</button>
              <button id="confirmButton" className="confirm_button" onClick={handleConfirm}>OK</button>
            </div>
          </div>
        </>
      )}
      {showpopUp2 && (
        <>
          <div className="overlay" id="overlay_2"></div>
          <div className="popup" id="weightPopup_2">
            <div className="popup-header">
              <h3>Ваш рост</h3>
            </div>
            <div className="weight-picker-section">
              <div className="weight-picker-container">
                <div id="weightPicker_2_1" className="weight-picker" ref={weightPicker21Ref}></div>
                <div className="highlight_3"></div>
              </div>
              <div className="comma">
                <span>,</span>
              </div>
              <div className="weight-picker-container">
                <div id="weightPicker_2_2" className="weight-picker" ref={weightPicker22Ref}></div>
                <div className="highlight_4"></div>
              </div>
              <div className="comma" id="comma_type_2">
                <span>см</span>
              </div>
            </div>
            <div className="buttons">
              <button id="cancelButton_2" className="cancel_button" onClick={cloasePop}>Отмена</button>
              <button id="confirmButton_2" className="confirm_button" onClick={handleConfirm2}>OK</button>
            </div>
          </div>
        </>
      )}
      {showpopUp3 && (
        <>
          <div className="overlay" id="overlay_3"></div>
          <div className="popup" id="weightPopup_3">
            <div className="popup-header">
              <h3>Ваш возраст</h3>
            </div>
            <div className="weight-picker-section">
              <div className="weight-picker-container">
                <div id="weightPicker_3_1" className="weight-picker" ref={weightPicker31Ref}></div>
                <div className="highlight_5"></div>
              </div>
            </div>
            <div className="buttons">
              <button id="cancelButton_3" className="cancel_button" onClick={cloasePop}>Отмена</button>
              <button id="confirmButton_3" className="confirm_button" onClick={handleConfirm3}>OK</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Popaps;
