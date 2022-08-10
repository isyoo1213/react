import { createStore, combineReducers } from 'redux';

import { createSlice, configureStore} from '@reduxjs/toolkit';

{/* redux를 사용하면서 문제가 될 수 있는 부분 >> reduxToolkit 사용
    1. action의 identifier가 복잡해질 때 >> 상수화
    2. state가 늘어나면서 반환하는 state 객체가 뚱뚱해지는 경우
    3. 2와 마찬가지로 중첩 객체나 배열 등 반환하는 state 객체의 구조가 복잡할 때 기존의 state를 건드리는 이슈*/}

{/* store에 slice된 reducer 여러개를 등록해야하는 상황 >> 원래 규칙은 store는 한 개의 리듀서 함수를 받음 
>> 이를 위해 combineReducers라는 redux의 패키지 사용 가능
>> but 더 쉽게 사용하기 위해 reduxtoolkit에 있는 configureStore를 통해 접근*/}

export const INCREMENT = 'increment';

const initialCounterState = {counter: 0, showCounter: true}

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
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
       >> 이는 이후에 기존의 서로 다른 action에 해당하는 리듀서들의 고유 액션 식별자를 자동 생성해줌 by counterSlice.actions
    2. 해당 state세트의 초기값
    3. 해당 state세트를 사용할 reducer의 if case문을 메서드화 >> 객체나 map의 상태로
       >> 메서드화 된 메서드는 state 스냅샷을 인자로 받음  
          but, action은 받지않음 >> action의 case별로 나눈 메서드이고, action의 분기에 따라 자동으로 호출됨
    *** 메서드의 실행구문으로 state를 직접 변형 >> 실제로는 기존 state를 변경하는 것이 아님
        >> reduxToolkit이 내부에서 사용하는 immer 패키지에서 해당 코드를 인식해 자동으로 원래 있는 state의 상태를 복제해
           새로운 state 객체를 생성 >> 모든 기존의 state자체는 변경되지 않도록 유지하면서, 우리가 변경한 state만 변하지 않도록(immutable하도록) 오버라이딩함 >>>>>> 여튼 state를 직접 변경하는 코드를 작성해도 내부적으로 알아서 immutable코드로 변환함
      * 메서드가 payload를 가진 사용자 정의의 메서드일 경우 - action인자를 추가로 받음*/}

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

const initialAuthState = {
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state){
      state.isAuthenticated = true;
    },
    logout(state){
      state.isAuthenticated = false;
    }
  }
});

const store = configureStore({
  reducer:{
    counter: counterSlice.reducer,
    auth: authSlice.reducer
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

export const counterActions = counterSlice.actions;
{/* counterSlice.actions객체는 내부에 reduxToolkit에 의해 자동으로 생성된 메서드에 접근 가능 
    >> 해당 메서드 호출시 사용할 수 있는 action 객체가 생성됨 - '액션 생성자'라고 불림
    >> 생성된 action 객체 - 내부에 이미 우리가 만든 reducer메서드에 따른 type 프로퍼티와 액션마다 다른 고유식별자가 자동 생성됨
    >> 즉, action 객체를 따로 생성할 필요 없이 Slice가 자동생성한 actions key 및 객체를 사용하면 됨 
    >> 생성된 action객체 이름과 앞서 정의한 리듀서 메서드의 이름이 같으면 action이 자동으로 전달되어 서로다른 매서드 작동
    이제 action과 store를 모두 export 하고 있으므로 이를 사용할 컴포넌트에서 작업*/}
export const authActions = authSlice.actions;

export default store;