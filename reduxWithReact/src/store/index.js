import { createStore, } from 'redux';
import { createSlice} from '@reduxjs/toolkit';

{/* redux를 사용하면서 문제가 될 수 있는 부분
    1. action의 identifier가 복잡해질 때 >> 상수화
    2. state가 늘어나면서 반환하는 state 객체가 뚱뚱해지는 경우
    3. 2와 마찬가지로 중첩 객체나 배열 등 반환하는 state 객체의 구조가 복잡할 때 기존의 state를 건드리는 이슈*/}

export const INCREMENT = 'increment';

const initialState = {counter: 0, showCounter: true}

createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment(state){
      state.counter++;
    },
    decrement(state){
      state.counter--;
    },
    increase(state, action){
      state.counter = state.counter + action.payload
    },
    toggleCounter(state){
      state.showCounter = !state.showCounter
    }
  }
});
{/* 객체를 인자로서 생성함 >> 전역 state의 slice를 생성 (서로 다른 파일에서 사용되는 state들을 함께 관리할 수있도록) 
    1. 세트로 사용할 state 묶음들의 이름
    2. 해당 state세트의 초기값
    3. 해당 state세트를 사용할 reducer의 if case문을 메서드화 >> 객체나 map의 상태로
       >> 메서드화 된 메서드는 state 스냅샷을 인자로 받음  
          but, action은 받지않음 >> action의 case별로 나눈 메서드이고, action의 분기에 따라 자동으로 호출됨
    *** 메서드의 실행구문으로 state를 직접 변형 >> 실제로는 기존 state를 변경하는 것이 아님
        >> reduxToolkit이 내부에서 사용하는 immer 패키지에서 해당 코드를 인식해 자동으로 원래 있는 state의 상태를 복제해
           새로운 state 객체를 생성 >> 모든 기존의 state자체는 변경되지 않도록 유지하면서, 우리가 변경한 state만 변하지 않도록(immutable하도록) 오버라이딩함 >>>>>> 여튼 state를 직접 변경하는 코드를 작성해도 내부적으로 알아서 immutable코드로 변환함
      * 메서드가 payload를 가진 사용자 정의의 메서드일 경우 - action인자를 추가로 받음*/}

const counterReducer = (state = initialState, action) => {
  if(action.type === INCREMENT){
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