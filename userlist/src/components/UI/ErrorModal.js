import React from "react";
import ReactDom from "react-dom";
import Card from "./Card.js";
import Button from "./Button.js";
import styles from "./ErrorModal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onErrorConfirm} />;
};

const MordalOverlay = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}>
        <Button onClick={props.onErrorConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop onErrorConfirm={props.onErrorConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {/* 1. createPortal()의 첫 인자로 JSX형식을 사용해야 함 
          2. 두 번째 인자로 실제 렌더링 되어야 하는 DOM의 컨테이너의 포인터 > DOM API를 활용*/}
      {/* 실제 해당 컴포넌트가 렌더링되는 AddUser.js에서 설정된 props를 반드시 설정해주어야함 */}
      {ReactDom.createPortal(
        <MordalOverlay
          title={props.title}
          message={props.message}
          onErrorConfirm={props.onErrorConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
