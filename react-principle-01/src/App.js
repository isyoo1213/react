import React, { useState, useCallback } from "react";

import "./App.css";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log("APP RUNNING");

  const toggleParagraphHandler = useCallback(() => {
    if(allowToggle){
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  }, [allowToggle]);
  {/* useCallback()
      ex) obj1 = {}, obj2 ={}
          obj1 === obj2 >> false
          obj2 = obj1 //obj1의 값이 저장된 공간의 주소를 obj2에 할당 - 참조값들의 특성
          obj1 === obj2 >> true
      useCallback()은 함수를 리액트 내부의 공간에 저장해 해당 공간을 참조하며 재사용할 수 있도록 해줌 */}
  {/* useCallback() 인자 내부에서 사용되는 변수 중, 외부로부터 사용하는 변수 allowToggle은 useCallback이 실행되는 최초의 값(false)으로 고정되어 저장됨 by 클로저 >> 의존성 배열에 추가해주어야함 >> 해당 변수가 변할 때마다 새로운 함수로 저장*/}

  const allowTogglehHandler = () => {
    setAllowToggle(true);
  }

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowTogglehHandler}>Allow Toggling</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
    </div>
  );
}

export default App;
