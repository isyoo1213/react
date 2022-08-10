import { useSelector } from 'react-redux';
import styles from './Counter.module.css';

const Counter = () => {
  const counter = useSelector((state) => {return state.counter})
  {/* useSelector 훅은 react-redux에서 개발 >> store의 state에 접근할 수 있게됨
      useSelector()의 인자로는 redux가 관리하는 state를 받고, state의 일부를 리턴하는 함수
      >> 해당 함수는 react-redux에서 실행 
      *** useSelector()는 컴포넌트를 위해 redux store에 subscription을 스스로 설정해줌
      해당 컴포넌트가 사라지고 DOM에서 제거되면 subscription도 스스로 해제함*/}

  const toggleCounterHandler = () => {};

  return (
    <main className={styles.counter}>
      <h1>Redux Counter</h1>
      <div className={styles.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
