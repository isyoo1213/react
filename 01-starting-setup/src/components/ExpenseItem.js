import './ExpenseItem.css';

function ExpenseItem() {

    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const date = now.getDate();
    
    const expenseDate = `${year}.${month}.${date}`
    
    const expenseTitle = 'Car Insurance';
    const expenseAmount = 30000;

  return (
    <div className='expense-item'>
      <div>{expenseDate}</div>
      <div className='expense-item__description'>
        <h2>{expenseTitle}</h2>
        <div className='expense-item__price'>{expenseAmount}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
