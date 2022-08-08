import { useState, useReducer } from 'react';

const inputStateReducer = (state, action) => {
  if(action.type === 'INPUT'){
    return {value: action.payload, isTouched: state.isTouched}
    {/* isTouched는 그대로 둠 (초기값이 false이고, 입력값과 별개로 첫 Blur된 이후에만 true로 쭉 트리거됨) */}
  }
  if(action.type === 'BLUR'){
    return {value: state.value, isTouched: true}
  }
  if(action.type === 'RESET'){
    return {value: '', isTouched: false}
  }
  return inputStateReducer
}

const initialInputState = {
  value: '',
  isTouched: false
}

const useInput = (validateValue) => {

  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

  // const [enteredValue, setEnteredValue] = useState('');
  // const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched; 

  const valueChangeHandler = (event) => {
    dispatch({type: 'INPUT', payload: event.target.value});
    // setEnteredValue(event.target.value);
  }

  const inputBlurHandler = () => {
    dispatch({type: 'BLUR'})
    // setIsTouched(true);
  }

  const reset = () => {
    dispatch({type: 'RESET'})
    // setEnteredValue('');
    // setIsTouched(false);
  }

  return {
    value: inputState.value,
    hasError: hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }
  
}

export default useInput;