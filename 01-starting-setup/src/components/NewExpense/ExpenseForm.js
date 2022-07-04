import React, {useState} from 'react';
import './ExpenseForm.css';

const ExpenseForm = () => {
    const [enteredTitle, setEnteredTitle] = useState('');

    //바닐라 JS처럼 event 발생 시 자동적으로 event 객체 획득
    //컴포넌트가 재평가될 때에도 특정 값을 저장하고 가져오기 위해서 state사용 가능
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
        console.log(event.target.value);
    }
    //이 작업은 컴포넌트 자체의 업데이트지만 렌더를 업데이트하기 위한 작업이 아님. state를 활용한 저장기능.
    //컴포넌트 함수의 생명주기와 독립적인 별개의 전수에 값을 저장하고 로드하기 위함.

    const [enteredAmount, setEnteredAmount] = useState('');
    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
        console.log(event.target.value);
    }

    const[enteredDate, setEnteredDate] = useState('');
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
        console.log(event.target.value);
    }

    return <form>
        <div className='new-expense__comtrols'>
            <div className='new-expense__control'>
                <label>Title</label>
                <input type='text' onChange={titleChangeHandler}></input>
            </div>
            <div className='new-expense__control'>
                <label>Amount</label>
                <input type='number' min='0.01' step='0.01' onChange={amountChangeHandler}></input>
            </div>
            <div className='new-expense__control'>
                <label>Date</label>
                <input type='date' min='2022-07-04' max='2022-07-31' onChange={dateChangeHandler}></input>
            </div>
        </div>
        <div className='new-expense__actions'>
            <button type='submit'>Add Expense</button>
        </div>
    </form>
}

export default ExpenseForm;