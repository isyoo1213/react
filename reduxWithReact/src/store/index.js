import { configureStore} from '@reduxjs/toolkit';

import counterReducer from './counter-slice';
import authReducer from './auth-slice';

{/* redux를 사용하면서 문제가 될 수 있는 부분 >> reduxToolkit 사용
    1. action의 identifier가 복잡해질 때 >> 상수화
    2. state가 늘어나면서 반환하는 state 객체가 뚱뚱해지는 경우
    3. 2와 마찬가지로 중첩 객체나 배열 등 반환하는 state 객체의 구조가 복잡할 때 기존의 state를 건드리는 이슈*/}

{/* store에 slice된 reducer 여러개를 등록해야하는 상황 >> 원래 규칙은 store는 한 개의 리듀서 함수를 받음 
>> 이를 위해 combineReducers라는 redux의 패키지 사용 가능
>> but 더 쉽게 사용하기 위해 reduxtoolkit에 있는 configureStore를 통해 접근*/}

// const counterReducer = (state = initialState, action) => {
//   if(action.type === INCREMENT){
//     // state.counter++; // JS의 배열과 객체는 '참조값'이므로 기존의 state를 변형시킴 >> 버그나 state가 동기화 되지 않는 경우에 예기치 않은 부작용 가능
//     // return{
//     //   counter: state.counter,
//     //   showCounter: state.showCounter
//     // }
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter
//     }
//     {/* 만약 return하는 state객체의 스냅샷에 showCounter 속성을 빼면, showCounter: undefined가 되어 false로 인식
//         >> increment 버튼을 눌렀을 때 counter를 렌더하는 컴포넌트 자체가 사라짐
//         >> 원하지 않는 error이자 side-effect
//         >> *** redux에서 return하는 객체는 이전의 state스냅샷을 '덮어쓰기'함
//         >> 그러나 리턴하는 state 객체를 수정하는 것이 아닌, state.counter++; 처럼 기존의 state자체를 변경하는 것은 결코 안됨
//            잘 작동하는 것 처럼 보이나, 항상 새로운 state 객체를 반환해 재정의해야함  */}
//   } else if (action.type === 'decrement'){
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter
//     }
//   } else if (action.type === 'increase'){
//     return {
//       counter: state.counter + action.payload,
//       showCounter: state.showCounter
//     } 
//   } else if (action.type === 'toggle'){
//     return{
//       counter: state.counter,
//       showCounter: !state.showCounter
//     }
//   }

//   return state;
// }

// const store = createStore(counterSlice.reducer);
// {/* counterSlice.reducer는 기존의 counterReducer구조에서 if case를 대체한 reducers를 통합한 reducer를 반환함 */}



const store = configureStore({
  reducer:{
    counter: counterReducer,
    auth: authReducer
  } 
});
{/* configureStore()는 reducer함수가 아닌 '설정' 객체를 받음 >> 설정 객체는 reducer 프로퍼티를 설정 
    reducer 프로퍼티 - (not reducer's') - redux든 reduxtoolkit이든 store는 주요 reducer 함수 한가지만 받음
      >> 모든 reducer 메서드를 가진 counterSlice.reducer를 전역 리듀서 함수로 사용 (현재는 sliceReducer가 하나뿐)
      >> but, 전역으로 사용할 sliceReducer가 많다면? >> reducer 프로퍼티의 key에 대한 value로 객체를 설정해줌 
      >> map 구조 >> store는 모든 리듀서를 하나의 큰 리듀서로 병합해 인식
         ex> const store = configureStore({
               reducer: {
                 counter: counterSlice.reducer
               } 
             });*/}


{/* counterSlice.actions객체는 내부에 reduxToolkit에 의해 자동으로 생성된 메서드에 접근 가능 
    >> 해당 메서드 호출시 사용할 수 있는 action 객체가 생성됨 - '액션 생성자'라고 불림
    >> 생성된 action 객체 - 내부에 이미 우리가 만든 reducer메서드에 따른 type 프로퍼티와 액션마다 다른 고유식별자가 자동 생성됨
    >> 즉, action 객체를 따로 생성할 필요 없이 Slice가 자동생성한 actions key 및 객체를 사용하면 됨 
    >> 생성된 action객체 이름과 앞서 정의한 리듀서 메서드의 이름이 같으면 action이 자동으로 전달되어 서로다른 매서드 작동
    이제 action과 store를 모두 export 하고 있으므로 이를 사용할 컴포넌트에서 작업*/}


export default store;