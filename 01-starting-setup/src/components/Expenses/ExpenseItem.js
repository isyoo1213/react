import React from 'react';
import ExpenseDate from './ExpenseDate.js';
import './ExpenseItem.css';
import './ExpenseDate.js';
import Card from '../UI/Card.js';

const ExpenseItem = (props) => {

    // const now = new Date();

    // const year = now.getFullYear();
    // const month = now.getMonth()+1;
    // const date = now.getDate();


    // const korYear = props.date.getFullYear();

    
    // const expenseDate = `${year}.${month}.${date}`
    // const expenseTitle = 'Car Insurance';
    // const expenseAmount = 30000;

    let title = props.title;

  return (
    <Card className='expense-item'>
      <ExpenseDate date={props.date}/>  
      <div className='expense-item__description'>
        <h2>{title}</h2>
        <div className='expense-item__price'>{props.amount}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
