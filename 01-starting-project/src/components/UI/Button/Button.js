// import './Button.css';

import styles from './Button.module.css';

// import styled from "styled-components";

// const Button = styled.button`
//    {
//     width: 100%;
//     font: inherit;
//     padding: 0.5rem 1.5rem;
//     border: 1px solid #8b005d;
//     color: white;
//     background: #8b005d;
//     box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//     cursor: pointer;
//   }

//   @media (min-width: 768px) {
//     width: auto;
//   }

//   &:focus {
//     outline: none;
//   }

//   &:hover,
//   &:active {
//     background: #ac0e77;
//     border-color: #ac0e77;
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
//   }
// `;
// Taged Template Literal (by JS not other package)
//styled 패키지는 모든 html 엘리먼트에 대한 method를 내장
//button은 styled 객체의 method >> 괄호로 호출하는 것이 아닌 백틱으로 호출
//백틱 내에 인자 전달 >> button method는 새로운 button Component를 반환

const Button = props => {
  return (
    //styles는 객체, 객체의 속성을 통해 css 클래스를 접근하고, 동적으로 새로운 고유한 wrapper클래스로 생성해준다
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
