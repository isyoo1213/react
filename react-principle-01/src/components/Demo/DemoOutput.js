import React from "react";
import MyParagraph from "./MyParagraph";

const DemoOutput = (props) => {
  console.log('DemoOutput RUNNING')
  return <MyParagraph>{props.show ? "This is new!" : ""}</MyParagraph>;
};
{/* 실제 변화는 <p> 내의 텍스트이지만, props의 상태를 관리하는 App.js의 컴포넌트도 props의 변화에 따른 재평가 및 재실행으로인해 재실행
>> DemoOutput RUNNING이 출력 */}
{/* App.js에서 넘겨주는 props.show를 false로 고정시킨 경우
    - App.js에서 클릭마다 state변화로 App.js 재평가 및 재실행> App.js의 return에서 사용되는 컴포넌트가 자동으로 호출(재실행)
    >> Button, DemoOutput 컴포넌트 또한 호출되므로 콘솔 로그가 찍힘
    >> ** 이 때 부모컴포넌트가 자식 컴포넌트를 호출하지만, 실제 DOM에서의 변화는 없다
    >> 컴포넌트의 재평가 및 재실행 != 실제 DOM의 변경과 렌더링 */}

export default React.memo(DemoOutput);
{/* memo는 함수형 컴포넌트에서만 사용 가능
    인수로 받은 컴포넌트에 입력되는 모든 props의 신규값을 확인한 뒤, 기존의 props 값과 비교하도록 react에 전달 
    >> props에 변경이 있을 경우에만 해당 컴포넌트를 재실행 및 재평가하도록 함
    >> 해당 컴포넌트의 자식 컴포넌트도 재실행되지 않음 
    - 그렇다면 왜 모든 컴포넌트에 사용하지 않을까?
    >> 기존의 props를 저장할 공간, 그리고 변경점을 비교하는 작업을 처리하는 리소스 필요
    >> 주로 자식 컴포넌트의 층위가 깊을수록 props 성능 비용을 상회하는 효과*/}
