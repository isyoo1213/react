import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];
  {/* useStore를 호출했을 때, globalState가 재생성되는 것이 아님
      이 커스텀 훅 외부에 정의한 것을 호출함 >> 처음에 이 파일이 import될 때 처음 생성되고 끝
      >> 그 후 이 파일을 import하는 모든 파일에서는 동일한 globalState를 사용하게 되는 것이 중요한 개념
      ** 커스텀 훅은 논리를 공유하고 데이터는 공유하지 않았음 vs 지금은 논리와 데이터 모두 공유 by 훅 밖에서 데이터를 관리함에 따라서 */}
  {/* 현재는 usState의 두 번째 리턴인 set함수에만 관심이 있음. state의 스냅샷은 나중에. 
      why? - 이 커스텀 훅을 호출하는 컴포넌트는 재렌더링. 즉 재렌더링을 하기 위해. */}

  const dispatch = (actionIdentifier) => {
    const newState = actions[actionIdentifier](globalState);
    {/* action들은 함수여야 함. 즉 actions 객체에 actionIdentifier의 키를 통해 등록된 구체적인 함수. 소괄호를 통해 호출 */}

    globalState = {...globalState, ...newState};

    for(const listener of listeners){
      listener(globalState)
    }
  }


  useEffect(()=>{
    listeners.push(setState);
    {/* 커스텀훅을 사용하는 모든 컴포넌트들이 각각의 setState함수를 가지게 되고, listeners배열에 추가함으로써 공유될 수 있게 함 */}
    return () => {
      listeners = listeners.filter(li => !setState)
    }
  }, [setState]) 
  {/* 훅을 사용하는 컴포넌트가 업데이트 될 때마다 listners에 setState함수 추가 
      의존성 배열 - 컴포넌트가 마운트 될 때만 실행되고, 언마운트될 때 클린업 되도록(setState는 마운트될때와 언마운트될때 어차피 같음) 설정
      + setState는 결국 이를 사용하는 컴포넌트에 대해서는 immutable이므로 해당 useEffect는 불변하는 의존성만을 가짐. 즉 변할 일 이 없다는 것. (만약 디스트럭쳐링으로 setState를 가져왔다면 린팅 도구가 업데이트 함수라는 것을 알고 변하지 않을 것을 알고 오류 안띄움)*/}

  return [globalState, dispatch]
}

export const initStore = (userActions, initialState) => {
  if(initialState){
    globalState = {...globalState, ...initialState}
    actions = {...actions, ...userActions}
  }
}