import { Fragment } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import styles from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  {/* location 객체에는 최근 로드된 page와 url에 대한 정보
      >> 객체 내 search 속성 개체내에 params에 대한 정보가 담겨있음 */}

  const match = useRouteMatch();

  console.log(match);
  console.log(location);
  {/* match와 location모두 사용 가능
      match - path 속성 / location - pathname에 /quotes << 문자정보 확인 가능 */}

  const queryParams = new URLSearchParams(location.search);
  {/* QueryParameter와 route 매개변수, :quoteId와 같은 매개변수와의 차이점
      1. 선택적으로 사용가능 - route매칭 자체에 영향을 미치지 않음
      2. 매칭된 route에 추가적인 behavior - by url을 통한 정보의 저장
    >> location 객체의 key인 search를 통해 쿼리 파라미터를 객체로 추출 */}

  const isSortingAscending = queryParams.get('sort') === 'asc';
  {/* 객체로 추출된 쿼리파라미터를 key를 통해 value를 추출한 후 비교 */}
  console.log(isSortingAscending);

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`,
    })
    // history.push(`${location.pathname}?sort=${(isSortingAscending ? 'desc' : 'asc')}`)
    {/* hisory에서 push를 통해 페이지를 리렌더링 >> 같은 페이지의 모습을 다시 랜더링 하더라도 location 객체의 속성변화 */}
    {/* location객체를 통해 최대한 하드코딩을 피해 템플릿리터럴로 표현 */}
  }

  return (
    <Fragment>
      <div className={styles.sorting}>
        <button onClick={changeSortingHandler}>Sort {isSortingAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={styles.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
