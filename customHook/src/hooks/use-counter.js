import React, { useState, useEffect } from "react";

const useCounter = (forward = true) => {
  console.log("useCounter 진입");
  const [counter, setCounter] = useState(0);
  console.log(`counter state - counter : ${counter} `);

  useEffect(() => {
    console.log(`useEffect 진입 -- forward : ${forward}`);
    const interval = setInterval(() => {
      if (forward === true) {
        setCounter((prevCounter) => prevCounter + 1);
        console.log(`forward === true >>> 작동 >>> state : ${counter}`);
      } else if (forward === false) {
        setCounter((prevCounter) => prevCounter - 1);
        console.log(`forward === false >>> 작동 >>> state : ${counter}`);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log(`return called`)
    };
  }, [forward]);{/* effect 작동방법 확인하기 */}
  {
    /* forward는 useEffect() 내부에서 정의된 것도 아니고, 커스텀 훅의 외부에서 지정된 것도 아니고 매개변수로 받는 값
      >> 의존성으로 추가 >> 의존성이 변경될 때마다 useEffect함수가 재실행  */
  }

  return counter;
};

export default useCounter;
