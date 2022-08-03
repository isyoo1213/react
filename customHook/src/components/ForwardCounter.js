import { useState, useEffect } from 'react';

import Card from './Card';
import useCounter from '../hooks/use-counter';

const ForwardCounter = () => {
  const counter = useCounter();
  {/* 정의해둔 hook을 서로 다른 컴포넌트에서 임포트해서 구현한다해도, 각각의 컴포넌트마다의 상태를 생성함. 공유되는 것 아님 */}
  
  // const [counter, setCounter] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((prevCounter) => prevCounter + 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
