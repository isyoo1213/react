import React, { useState, useRef } from "react";
import Card from "../UI/Card.js";
import styles from "./AddUser.module.css";
import Button from "../UI/Button.js";
import ErrorModal from "../UI/ErrorModal.js";
import Wrapper from "../Helpers/Wrapper.js";

const AddUser = (props) => {
  const nameInputRef = useRef();
  {
    /* 생성되는 ref는 '객체' > 항상 current라는 속성을 가지고 있음 > 연결된 ref가 가진 실제 값을 가짐
      기본값은 undefined로 설정했지만, input에 설정한 ref프랍으로 연결됨
      실제 연결된 것은 이론적인 값이 아닌 username이라는 className을 가진 실제 DOM 노드 */
  }
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(nameInputRef, ageInputRef);
    console.log(nameInputRef.current.value, ageInputRef.current.value);
    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age(non-empty values)",
      });
      console.log("An error occured");
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age ( > 0 )",
      });
      console.log("An error occured");
      return;
    }
    props.onAddUser(enteredName, enteredAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    {/* 원래 DOM요소를 리액트를 거치지 않고 직접적으로 수정하는 것은 바람직하지 않으나, 사용자의 입력값만 바꿔주므로 사용 */}
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onErrorConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          {/*ref는 어떤 html요소에서도 사용할 수 있는 내장 prop 
               ref에 담긴 값은 나중에 실제 DOM 요소가 됨*/}
          <label htmlFor="age">Age(Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
