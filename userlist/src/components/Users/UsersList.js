import React from "react";
import styles from "./UsersList.module.css";
import Card from "../UI/Card.js";

const UsersList = (props) => {
  return (
    <Card className={styles.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age}years old)
          </li>
        ))}
        {/*백틱으로 묶어주지 않는 이유는 뭘까*/}
      </ul>
    </Card>
  );
};

export default UsersList;
