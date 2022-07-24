import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedInfo = localStorage.getItem("isLoggedIn");

    if (storedInfo === "LOGGED_IN") {
      setIsLoggedIn(true);
      {/* useEffect를 사용하지 않을 시, state 설정 함수를 호출할 때마다 컴포넌트를 재평가위해 재실행 > 무한루프 
          컴포넌트 내에 속해있으므로 모든 컴포넌트의 재평가 후에 리액트에 의해 실행됨*/}
    }
  });

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "LOGGED_IN");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
