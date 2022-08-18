import { Fragment } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
  {id: 'q1', author: 'koala', text: 'Eat, Sleep, Pee & Poo!'},
  {id: 'q2', author: 'insung', text: 'Eat, Sleep, Code!'},
  {id: 'q3', author: 'dog', text: 'Eat, Sleep, Bark!'}
] 

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  console.log(match);
  {/* match 객체에는 params외에 path와 url을 구분한 속성이 존재
      path는 Route를 활용해 정의한 경로, placeholder(:quoteId) */}

  const quote = DUMMY_QUOTES.find((quote)=>{return quote.id === params.quoteId})

  if(!quote){
    return <p>No Quote Found...</p>
  }

  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        {/* Route의 경로정의 !== Link를 통한 concrete value
            - placeholder가 그대로 존재하는 route 경로로 정의 가능 
            >>> App.js에서 정의된 root Route의 주소가 변경되더라도, nested Route에서 문자열 주소를 변경해줄 필요 없음*/}
        <div className="centered">
          <Link to={`${match.url}/comments`} >
            {/* Link에 할당되는 concrete value는 match의 url을 통해 특정화해서 가져오기 가능 */}
            Load Comments
          </Link>
        </div>
      </Route>
      {/* <Route path={`/quotes/${params.quoteId}/comments`} > */}
      {/* App.js의 Route에 정의된 /quotes/:quoteId <<에 exact 설정 시 url이 1:1대응에서 어긋나므로 풀어주어야함 */}
      <Route path={`${match.path}/comments`} >

        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
