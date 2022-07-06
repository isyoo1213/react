import React, {useState} from 'react';
import './ExpenseForm.css';

const ExpenseForm = () => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    // const [userInput, setUserInput] = useState({
    //     enteredTitle: '',
    //     enteredAmount: '',
    //     enteredDate: ''
    // });

    //바닐라 JS처럼 event 발생 시 자동적으로 event 객체 획득
    //컴포넌트가 재평가될 때에도 특정 값을 저장하고 가져오기 위해서 state사용 가능
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
        /*
        setUserInput({
                ...userInput,
                // state들을 객체로 묶었을 때, 한 속성만 변경한다면 기존 state객체에 덮어쓰기가 아닌 현재 해당 state속성만 새로 생성 >> 이전의 amount와 date를 위한 key, value 값을 잃어버림 >> 모든 객체 속성들이 사라지지 않도록 해야함 >> spread 연산자로 가져온 후 변한 state속성만 override
                enteredTitle: event.target.value,
            })
        */

        console.log(event.target.value);
        
        /*
        setUserInput((prevState) => {
            return {...prevState, enteredTitle: event.target.value};
       });
       // 이전 state에 의존하는 다수의 state 속성을 가진 state 객체를 관리할 때는 업데이트 함수에 '함수'를 통해 넘겨주는 것이 업데이트된 최신의 state 스냅샷을 안전하게 가져올 수 있다.
       */
    }
    //이 작업은 컴포넌트 자체의 업데이트지만 렌더를 업데이트하기 위한 작업이 아님. state를 활용한 저장기능.
    //컴포넌트 함수의 생명주기와 독립적인 별개의 전수에 값을 저장하고 로드하기 위함.

    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
        // setUserInput({
        //     ...userInput,
        //     enteredAmount: event.target.value,
        // })
        console.log(event.target.value);
    }

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
        // setUserInput({
        //     ...userInput,
        //     enteredDate: event.target.value,
        // })
        console.log(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate)
        };

        console.log(expenseData);

        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
    }

    return <form onSubmit={submitHandler}>
        <div className='new-expense__comtrols'>
            <div className='new-expense__control'>
                <label>Title</label>
                <input type='text' value={enteredTitle} onChange={titleChangeHandler}></input>
            </div>
            <div className='new-expense__control'>
                <label>Amount</label>
                <input type='number' value={enteredAmount} min='0.01' step='0.01' onChange={amountChangeHandler}></input>
            </div>
            <div className='new-expense__control'>
                <label>Date</label>
                <input type='date' value={enteredDate} min='2022-07-04' max='2022-07-31' onChange={dateChangeHandler}></input>
            </div>
        </div>
        <div className='new-expense__actions'>
            <button type='submit'>Add Expense</button>
        </div>
    </form>
}

export default ExpenseForm;