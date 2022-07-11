import React, { useState } from "react";
import ExpenseDate from "./ExpenseDate.js";
import "./ExpenseItem.css";
import "./ExpenseDate.js";
import Card from "../UI/Card.js";

const ExpenseItem = (props) => {
  // const now = new Date();

  // const year = now.getFullYear();
  // const month = now.getMonth()+1;
  // const date = now.getDate();

  // const korYear = props.date.getFullYear();

  // const expenseDate = `${year}.${month}.${date}`
  // const expenseTitle = 'Car Insurance';
  // const expenseAmount = 30000;

  // 특별한 변수를 생성하는 것과 유사 >> 컴포넌트 함수가 다시 호출되도록

  //-----섹션5 - 67 State 저장 목록 사용에서 title 업데이트 함수가 문제가 있어 주석처리.------
  //관련 설명은 68에 3:00 - 추가한 새 item이 stateful하면 기존의 stateful을 덮어써버림
  /*const [title, setTitle] = useState(props.title); */

  //첫 번째 값 - 변수 자체 / 현재 상태의 값 >> title = props.title
  //두 번쨰 값 - 업데이트 함수 >> 새로운 값을 할당하기 위해 호출할 수 있는 함수
  //>>> state 변수가 변할 때 컴포넌트 함수를 다시 호출하고 싶으면 업데이트 함수를 호출하면 됨
  //>>> state 함수가 포함된 컴포넌트를 재평가해야 한다고 알림 >> 컴포넌트 함수와 JSX 재평가

  //>>> Expenses 컴포넌트에서 ExpenseItem 컴포넌트가 4번 호출 됨 >> 서로 독립적으로 관리되는 state
  //>>> 컴포넌트의 '인스턴스' 기준으로 state를 독립적으로 관리 및 재평가

  //const로 지정한 이유 - 최초의 state상태는 컴포넌트 함수 최초 호출 시에만 props.title을 초기화하고 저장
  //이후 state변수의 변동은 따로 관리되며 title이라는 변수에 직접 할당이 아닌, 리액트가 관리하는 메모리로부터 받아옴

  //-----섹션5 - 67 State 저장 목록 사용에서 title 업데이트 함수가 문제가 있어 주석처리.------
  /*const clickHandler = () => {
      setTitle('Updated');
      //업데이트 함수 실행 후 바로 값이 변하는 것이 아닌 해당 state변수의 업데이트를 예약
      //>> 다음 출력에 찍히는 값은 기존의 props.title이 그대로 출력됨
      //>> 이후 컴포넌트 함수, JSX를 재평가 후 업데이트 된 내용을 렌더함
      console.log(title);
      console.log('ExpenseItem evaluated by React');
    }
    */

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">{props.amount}</div>
        </div>
        {/*-----섹션5 - 67 State 저장 목록 사용에서 title 업데이트 함수가 문제가 있어 주석처리.------*/}
        {/* <button onClick={clickHandler}>Change Title</button> */}
      </Card>
    </li>
  );
};

export default ExpenseItem;
