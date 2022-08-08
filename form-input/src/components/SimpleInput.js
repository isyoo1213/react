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

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.includes('@'));


  let formIsValid = false;


  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }
  

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    {/* 이제는 입력값이 유효하지 않다면 form의 submit 자체가 불가능하므로 로직 불필요 >> form을 reset해주는 함수 필요 */}

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailInputHasError
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
      <div className={emailInputClasses}>
        <label htmlFor="email">Your email</label>
        <input
          value={enteredEmail}
          type="text"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Email must have @ !</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
