import React, { useState, useCallback } from "react";

import "./App.css";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log("APP RUNNING");

  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  }, []);
  {/* useCallback()
      ex) obj1 = {}, obj2 ={}
          obj1 === obj2 >> false
          obj2 = obj1 //obj1의 값이 저장된 공간의 주소를 obj2에 할당 - 참조값들의 특성
          obj1 === obj2 >> true
      useCallback()은 함수를 리액트 내부의 공간에 저장해 해당 공간을 참조하며 재사용할 수 있도록 해줌 */}

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false} />
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
    </div>
  );
}

export default App;
