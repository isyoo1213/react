import ExpenseDate from './ExpenseDate.js';
import './ExpenseItem.css';
import './ExpenseDate.js';

function ExpenseItem(props) {

    // const now = new Date();

    // const year = now.getFullYear();
    // const month = now.getMonth()+1;
    // const date = now.getDate();


    // const korYear = props.date.getFullYear();

    
    // const expenseDate = `${year}.${month}.${date}`
    // const expenseTitle = 'Car Insurance';
    // const expenseAmount = 30000;

  return (
    <div className='expense-item'>
      <ExpenseDate date={props.date}/>  
      <div className='expense-item__description'>
        <h2>{props.title}</h2>
        <div className='expense-item__price'>{props.amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
