import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});
//컨텍스트 객체 생성, 자체는 컴포넌트가 아니지만, 컴포넌트를 포함한 객체. >> 이후 provider라는 속성을 통해 컴포넌트화
//이후 해당 객체를 사용할 수 있도록 공급(컨텍스트를 사용할 수 있는 컴포넌트가 리스닝할 수 있도록 JSX코드로 감싸는 것), 소비 처리를 해주어야 함
//원래 기본값을 설정하면 공급자는 필요없음. 그러나 변할 수 있는 값일 경우 공급자가 꼭 필요.

//아래 AuthContextProvider는 컴포넌트
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedInfo = localStorage.getItem("isLoggedIn");

    if (storedInfo === "LOGGED_IN") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "LOGGED_IN");
    setIsLoggedIn(true);
  };
  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.childern}
    </AuthContext.Provider>
  );
};

export default AuthContext;
