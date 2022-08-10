import { useSelector, useDispatch } from 'react-redux';
import styles from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  {/* redux의 store에 action을 보내줄 수 있는 함수 
      useDispatch()는 redux에 dispatch를 실행할 수 있는 함수를 반환함*/}
  const counter = useSelector((state) => {return state.counter})
  {/* useSelector 훅은 react-redux에서 개발 >> store의 state에 접근할 수 있게됨
      useSelector()의 인자로는 redux가 관리하는 state를 받고, state의 일부를 리턴하는 함수
      >> 해당 함수는 react-redux에서 실행 
      *** useSelector()는 컴포넌트를 위해 redux store에 subscription을 스스로 설정해줌
      해당 컴포넌트가 사라지고 DOM에서 제거되면 subscription도 스스로 해제함*/}
  const showCounter = useSelector(state => state.showCounter)

  const toggleCounterHandler = () => {
    dispatch({type: 'toggle'})
  };

  const incrementHandler = () => {
    dispatch({type: 'increment'})
  }

  const increaseHandler = () => {
    dispatch({type: 'increase', payload: 5})
  }

  const decrementHandler = () => {
    dispatch({type: 'decrement'})
  }

  return (
    <main className={styles.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={styles.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
