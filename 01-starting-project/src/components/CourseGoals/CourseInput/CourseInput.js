import React, { useState } from "react";
// import styled from "styled-components";

import Button from "../../UI/Button/Button";
import styles from "./CourseInput.module.css";

// const FormControl = styled.div`
//   margin: 0.5rem 0;

//   & label {
//     font-weight: bold;
//     display: block;
//     margin-bottom: 0.5rem;
//     color: ${(props) => (props.invalid ? "red" : "black")};
//     //화살표 함수 형식인 이유는 styled에서 제공하는 함수로 처리하기 떄문에
//   }

//   & input {
//     display: block;
//     width: 100%;
//     border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
//     //이 떄 props는 FormControl 컴포넌트가 가진 모든 props를 가져옴
//     background: ${(props) => (props.invalid ? "#ffd7d7" : "transparent")};
//     font: inherit;
//     line-height: 1.5rem;
//     padding: 0 0.25rem;
//   }

//   & input:focus {
//     outline: none;
//     background: #fad0ec;
//     border-color: #8b005d;
//   }
//   /* 동적 스타일링으로 처리해준 부분
//   // &.invalid input {
//   //   border-color: red;
//   //   background: #ffd7d7;
//   // }
//   // 
//   // &.invalid label {
//   //   color: red;
//   // }
// */
// `;

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
      {/* 
      1. styles['form-control'] - 이 방식으로 객체의 key값을 통해 접근하는 것도 가능 
      2. invalid 로직이 삭제된 클래스이므로 적용되진 않음
      3. 백틱 내에서 처리를 통해 styles객체에서 클래스 이름을 추출한 문자열로 사용 
      4. invalid 클래스 또한 styles에서 추출해서 사용 */}
      {/* <FormControl invalid={!isValid && "invalid"}> */}
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      {/* </FormControl> */}
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
