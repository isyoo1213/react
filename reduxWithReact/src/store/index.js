import { createStore, } from 'redux';

const initialState = {counter: 0, showCounter: true}

const counterReducer = (state = initialState, action) => {
  if(action.type === 'increment'){
    // state.counter++; // JS의 배열과 객체는 '참조값'이므로 기존의 state를 변형시킴 >> 버그나 state가 동기화 되지 않는 경우에 예기치 않은 부작용 가능
    // return{
    //   counter: state.counter,
    //   showCounter: state.showCounter
    // }
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter
    }
    {/* 만약 return하는 state객체의 스냅샷에 showCounter 속성을 빼면, showCounter: undefined가 되어 false로 인식
        >> increment 버튼을 눌렀을 때 counter를 렌더하는 컴포넌트 자체가 사라짐
        >> 원하지 않는 error이자 side-effect
        >> *** redux에서 return하는 객체는 이전의 state스냅샷을 '덮어쓰기'함
        >> 그러나 리턴하는 state 객체를 수정하는 것이 아닌, state.counter++; 처럼 기존의 state자체를 변경하는 것은 결코 안됨
           잘 작동하는 것 처럼 보이나, 항상 새로운 state 객체를 반환해 재정의해야함  */}
  } else if (action.type === 'decrement'){
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    }
  } else if (action.type === 'increase'){
    return {
      counter: state.counter + action.payload,
      showCounter: state.showCounter
    } 
  } else if (action.type === 'toggle'){
    return{
      counter: state.counter,
      showCounter: !state.showCounter
    }
  }

  return state;
}

const store = createStore(counterReducer);

export default store;