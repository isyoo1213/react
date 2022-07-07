import React from "react";
import "./ExpensesFilter.css";

const ExpenseFilter = (props) => {

  const dropdownfilterChangeHandler = (event) => {
    console.log(event.target.value);
    props.onChangeFilter(event.target.value);
  }

  return (
    <div className="expenses-filter">
      <div className="expense-filter__control">
        <label>Filter by year</label>
        <select value={props.selected} onChange={dropdownfilterChangeHandler}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpenseFilter;
