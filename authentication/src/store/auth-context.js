import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;
//loginHandler에서 설정한 타이머를 컴포넌트와 상관없이 logoutHandler에서도 사용하기 위해 컴포넌트 외부에 설정

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retriveStoredToken = () => {
  const StoredToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 6000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return { token: StoredToken, duration: remainingTime };
};

export const AuthContextProvider = (props) => {
  const tokenData = retriveStoredToken();
  console.log(tokenData);
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  {
    /* localStorage는 synchronous API이므로 가능 */
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    {
      /* localStorage에 저장할 때는 String으로 저장. expirationTime도 Date객체가 아닌 String으로 받아옴 */
    }

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      {
        /* 왜 처음 로그인해도 이 콘솔이 찍히지? 로그인하지 않고 로그인된 상태에서 토큰정보를 가져올 때에만 찍혀야하는데  */
      }
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
