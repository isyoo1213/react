import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_EMAIL_INPUT") {
    return { value: action.payload, isValid: action.payload.includes("@") };
  }
  if (action.type === "USER_EMAIL_INPUT_DONE") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_PW_INPUT") {
    return { value: action.payload, isValid: action.payload.trim().length > 6 };
  }
  if (action.type === "USER_PW_INPUT_DONE") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState(); // 위 두 state는 Reducer를 활용해 emailState로 대체
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState(); // 위 두 state는 passwordState로 대체
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //객체 디스트럭쳐링을 통해 isValid 속성만 가져오기
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking Form-Validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    {
      /* useEffect()의 첫 인자는 return으로 함수(익명o 정의된 함수o) 클린업 함수를 가질 수 있음
        useEffect()의 첫 인자 함수가 실행되기 전에(최초 실행은 제외) 클린업 프로세스를 실행
        해당 effect를 특정한 컴포넌트가 DOM에서 언마운트될 때마다(컴포넌트가 재사용 될 때마다) 실행
        첫 사이드 이펙트 함수가 실행되기 전에는(마운트 후 처음으로 effect가 실행되기 전) 실행되지 않음 */
    }
    return () => {
      console.log("Clean Up");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_EMAIL_INPUT", payload: event.target.value });

    {
      /*
    setFormIsValid(
      event.target.value.includes("@") && passwordState.value.trim().length > 6
    );
  */
    }
    {
      /* state가 이전 state의 상태에 의존하고 있으나, 동일한 state가 아닌 서로 다른 두 개의 state이므로 
        함수형 폼을 전달하지 못함 (setFormIsValid라는 state의 변화에 enteredEmail과 enteredPassword가 영향)
        >> useReduce를 사용하기 좋은 조건 */
    }
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_PW_INPUT", payload: event.target.value });

    {
      /*
    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
    */
    }
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "USER_EMAIL_INPUT_DONE" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "USER_PW_INPUT_DONE" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
