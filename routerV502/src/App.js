import { Route, Routes, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import MainHeader from "./components/MainHeader";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" exact element={<Navigate replace to="/welcome" />} />
          {/* element요소로 Navigate JSX를 정의하면 해당 path에 대한 페이지 탐색을 탐색 스택으로 푸시함
              현재 페이지를 새 페이지로 바꾸는 redirect를 원할 경우 replace prop도 추가해야 함
              >> 새 페이지 push !== Redirecting */}
          <Route path="/welcome/*" element={<Welcome />}>
            {/* /welcome 만을 통해 welcome의 section내 h1만을 로드하고 싶을 경우
              >> section 내에 정의된 중첩라우트 또한 인식하고 로드할 수 있어야 함 */}
            <Route path="new-user" element={<p>Welcome, new user!</p>} />
            {/* 중첩 라우팅이 존재할 경우 이렇게 처리도 가능 */}
          </Route>
          <Route path="/products" exact element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

// our-domain.com/welcome => Welcome Component
// our-domain.com/products => Products Component
// our-domain.com/product-detail/a-book
