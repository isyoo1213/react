import { Routes, Route } from "react-router-dom";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Routes>
        <Route path="new-user" element={<p>Welcome, new user!</p>}>
        </Route>
      </Routes>
      {/* 변경점
        1. 중첩라우팅 - Routes로 감싸주어야하고 + Route정의 또한 element prop으로 정의
        2. 상위 라우트에서 중첩라우팅을 사용하기 위해 path에 '/*'를 추가해주어야 section으로 묶인 
           <h1>element와 Route인식
        3. 상위 라우트에서 후속적으로 처리되는 것을 인식함으로써 중첩 라우팅의 path에 상위 라우트 주소 삭제 */}
    </section>
  );
};

export default Welcome;
