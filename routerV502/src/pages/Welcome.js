import { Link, Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Link to='new-user'>New User</Link>
      {/* 링크 또한 이미 정의된 routes를 통해 로드된 컴포넌트 내에서 정의가 이루어지므로 상대경로 파악함 */}
      {/* 변경점
        1. 중첩라우팅 - Routes로 감싸주어야하고 + Route정의 또한 element prop으로 정의
        2. 상위 라우트에서 중첩라우팅을 사용하기 위해 path에 '/*'를 추가해주어야 section으로 묶인 
           <h1>element와 Route인식
        3. 상위 라우트에서 후속적으로 처리되는 것을 인식함으로써 중첩 라우팅의 path에 상위 라우트 주소 삭제 */}
      <Outlet/>
      {/* 최상위 라우트에서 중첩 라우트를 정의했을 경우, 해당 내용이 dom의 어느 위치에 표시되어야하는지 마크 */}
    </section>
  );
};

export default Welcome;
