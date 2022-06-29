import './ExpenseItem.css';

function ExpenseItem(props) {

    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const date = now.getDate();
    
    const expenseDate = `${year}.${month}.${date}`
    
    const expenseTitle = 'Car Insurance';
    const expenseAmount = 30000;

  return (
    <div className='expense-item'>
      <div>{props.date.toISOString()}</div>
      <div className='expense-item__description'>
        <h2>{props.title}</h2>
        <div className='expense-item__price'>{props.amount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
