import { Route, Routes } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import MainHeader from './components/MainHeader';

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          {/* 변경점
              1. Switch -> Routes
                - 기존에 Switch에서 Route의 자식으로 컴포넌트를 렌더링하던 방식이 element props를 통한 JSX 정의로 변경  
              2. path 탐색에서 exact의 기능이 default로 설정되어 명시할 필요가 없음
                - 라우팅 path의 적확한 문자열은 뒤에 '/*'를 붙임으로써 표현가능하나, path탐색 알고리즘이 자동적으로
                  근접한 path를 로드해줌  ex> /products >> v5에서는 exact를 설정하지 않은 것처럼 작동해야하나 그렇지 않다는 의미 
              3. route정의에 순서가 필요 없어짐 ex> /products/:productId와 같은 동적 세그먼트가 /products/edit 
                 라우트보다 먼저 정의되어있다면, 무조건 동적 세그먼트를 선택했으나, 이제는 상관없음 */}
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:productId' element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

// our-domain.com/welcome => Welcome Component
// our-domain.com/products => Products Component
// our-domain.com/product-detail/a-book
