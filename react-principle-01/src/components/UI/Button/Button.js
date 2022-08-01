import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  console.log('Button RUNNING');
  console.log(props);
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
{
  /* 이 Button 컴포넌트는 App 컴포넌트에서 props를 전해받지만, 실질적으로 변하지 않는 props를 받으므로 memo 사용에 적합 ?
    App.js의 App컴포넌트는 재실행시에 react에 의해 일반적인 함수처럼 모두 실행됨
    이 때, 재사용되는 것이 아닌 '새로운 함수'로 새롭게 const를 통해 만들어져 실행되는 것
    >> handler는 같은 기능의 새로운 함수.
    >> 그러나, DemoInput에 전달되는 props의 값인 false와 같이 JS의  primative type은 props 비교에 특징을 가지고 있음
    React.memo가 최종적으로 하는 일 - props 값을 비교할 때 '일반 비교 연산자(===)'를 통해 비교 
    - 배열이나 객체는 참조값이 같더라도 할당된 메모리가 다름
    + JS에서 함수는 하나의 객체에 불과하므로 값이 변경되었다고 인식*/
}
