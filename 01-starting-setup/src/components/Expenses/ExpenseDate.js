import './ExpenseDate.css'

function ExpenseDate(props) {
  const korYear = props.date.toLocaleString("ko-KR", { year: "numeric" });
  const korMonth = props.date.toLocaleString("ko-KR", { month: "long" });
  const korDay = props.date.toLocaleString("ko-KR", { day: "2-digit" });

  return (
    <div className='expense-date'>
      <div className='expense-date__year'>{korYear}</div>
      <div className='expense-date__month'>{korMonth}</div>
      <div className='expense-date__day'>{korDay}</div>
    </div>
  );
}

export default ExpenseDate;
