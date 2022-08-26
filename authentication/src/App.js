import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        {/* 라우터 자체도 컴포넌트이므로  */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
        {/* 사용자가 유효하지 않은 url을 접근하거나 + 조건부로 처리된 라우트에서 조건 미충족시 접근하려 할 때 */}
      </Switch>
    </Layout>
  );
}

export default App;
