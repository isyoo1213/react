import React from "react";

const MyParagraph = (props) => {
  console.log('MyParagraph RUNNING')
  return <p>{props.children}</p>;
};
{/* DemoOutput 컴포넌트의 자식 컴포넌트 또한 App.js의 재평가 및 재실행에 영향을 받아 재실행 */}


export default MyParagraph;
