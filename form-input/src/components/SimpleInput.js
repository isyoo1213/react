import { useRef, useState, useEffect } from "react";

import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value=>value.trim() !== '');
  {/* 인라인 함수로 '정의'만 되고 실행되지 않으며 useInput에 매개변수로 전해짐
      >> 실제 실행은 useInput의 validateValue()에서 state를 받아 실행됨 */}

  // const [enteredName, setEnteredName] = useState("");
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  // const [formIsValid, setFormIsValid] = useState(false);

  // const enteredNameIsValid = enteredName.trim() !== "";
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  let formIsValid = false;

  // useEffect(()=>{
  if (enteredNameIsValid) {
    formIsValid = true;
  }
  // else {
  //   formIsValid(false);
  // }
  // }, [enteredNameIsValid]);

  // useEffect(() => {
  //   if (enteredNameIsValid) {
  //     console.log("Name input is valid!");
  //   }
  // }, [enteredNameIsValid]);

  // const nameInputChangeHandler = (event) => {
  //   setEnteredName(event.target.value);

  //   // if (event.target.value.trim() !== "") {
  //   //   setEnteredNameIsValid(true);
  //   // }
  //   {
  //     /* if 조건을 state변수를 사용하지 않는 이유는 state의 업데이트는 비동기적이므로 이전 state를 참고함 */
  //   }
  // };

  // const nameInputBlurHandler = () => {
  //   setEnteredNameTouched(true);

  //   // if (enteredName.trim() === "") {
  //   //   setEnteredNameIsValid(false);
  //   // } else {
  //   //   setEnteredNameIsValid(true);
  //   // }
  // };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // setEnteredNameTouched(true);
    {/* 이제는 입력값이 유효하지 않다면 form의 submit 자체가 불가능하므로 로직 불필요 >> form을 reset해주는 함수 필요 */}

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    resetNameInput();
    // setEnteredName("");
    // setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          value={enteredName}
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty!</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
