import { createSlice } from "@reduxjs/toolkit";

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

export const counterActions = counterSlice.actions;
{/* 기존 index.js에서 export하던 actions를 이제 이 위치에서 export */}

export default counterSlice.reducer;
{/* slice 전체가 아닌 reducer를 export */}