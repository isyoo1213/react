import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";


const QuoteDetail = () => {
  const match = useRouteMatch();

  console.log(match);
  {/* match 객체에는 params외에 path와 url을 구분한 속성이 존재
      path는 Route를 활용해 정의한 경로, placeholder(:quoteId) */}

  const params = useParams();

  const { quoteId } = params;

  const {sendRequest, status, data:loadedQuote, error } = useHttp(getSingleQuote, true);

  useEffect(()=>{
    sendRequest(quoteId);
  }, [sendRequest, quoteId])

  if(status === 'pending'){
    <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if(error){
    return <p className="centered">{error}</p>
  }

  if(!loadedQuote){
    return <p>No Quote Found...</p>
  }
  {/* author와 quote의 본문 내용에 유효성 검증 필요 */}

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
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
