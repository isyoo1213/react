import { Fragment } from "react";
import { useParams, Route } from "react-router-dom";

import Comments from '../components/comments/Comments';

const QuoteDetail = () => {
  const params = useParams();

  return (
    <Fragment>
      <h1>Quote Detail Page</h1>
      <p>{params.quoteId}</p>
      <Route path={`/quotes/${params.quoteId}/comments`} >
        {/* App.js의 Route에 정의된 /quotes/:quoteId <<에 exact 설정 시 url이 1:1대응에서 어긋나므로 풀어주어야함 */}
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
