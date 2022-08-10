import { useSelector, useDispatch } from 'react-redux';
import styles from './Counter.module.css';
import { INCREMENT, counterActions } from '../store/index';

const Counter = () => {
  const dispatch = useDispatch();
  {/* redux의 store에 action을 보내줄 수 있는 함수 
      useDispatch()는 redux에 dispatch를 실행할 수 있는 함수를 반환함*/}
  const counter = useSelector((state) => {return state.counter.counter})
  {/* useSelector 훅은 react-redux에서 개발 >> store의 state에 접근할 수 있게됨
      useSelector()의 인자로는 redux가 관리하는 state를 받고, state의 일부를 리턴하는 함수
      >> 해당 함수는 react-redux에서 실행 
      *** useSelector()는 컴포넌트를 위해 redux store에 subscription을 스스로 설정해줌
      해당 컴포넌트가 사라지고 DOM에서 제거되면 subscription도 스스로 해제함*/}
  const showCounter = useSelector(state => state.counter.showCounter)

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  };

  const incrementHandler = () => {
    // dispatch({type: INCREMENT})
    dispatch(counterActions.increment())
    {/* increment에 ()실행 중괄호가 붙은 이유(메서드로 실행시키는 이유) - 
        >> 고유액션식별자가 자동으로 생성하게 설정된 '전체 액션 객체'를 만드는 '함수'
        >> 함수 자체를를 전달하는 것이 아닌, 전체 액션 객체를 '생성'해서 전달해주어야 함 */}
  }

  const increaseHandler = () => {
    dispatch(counterActions.increase(5))
    {/* payload가 필요한 경우 전체 액션 객체에 필요한 payload값을 인자로 넘겨주주면 자동으로 객체 내 payload 속성에 설정
        ReduxToolkit이 자동으로 생성해준 액션 생성자를 통해 {type: SOME_UNIQUE_IDENTIFIER, payload: argument}를 설정 
        payload 필드명은 reduxtoolkit이 사용하는 예약어 - 변경불가 >> 기존 slice에서 reducers 객체에도 action.payload 사용해야 함*/}
  }

  const decrementHandler = () => {
    dispatch(counterActions.decrement())
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
