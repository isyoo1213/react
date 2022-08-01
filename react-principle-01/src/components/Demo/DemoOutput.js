import React from "react";

const DemoOutput = (props) => {
  console.log('DemoOutput RUNNING')
  return <p>{props.show ? "This is new!" : ""}</p>;
};
{/* 실제 변화는 <p> 내의 텍스트이지만, props의 상태를 관리하는 App.js의 컴포넌트도 props의 변화에 따라 재평가
>> APP RUNNING이 출력 */}

export default DemoOutput;
