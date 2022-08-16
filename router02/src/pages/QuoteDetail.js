import { Fragment } from "react";
import { useParams, Route } from "react-router-dom";

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
  {id: 'q1', author: 'koala', text: 'Eat, Sleep, Pee & Poo!'},
  {id: 'q2', author: 'insung', text: 'Eat, Sleep, Code!'},
  {id: 'q3', author: 'dog', text: 'Eat, Sleep, Bark!'}
] 

const QuoteDetail = () => {
  const params = useParams();

  const quote = DUMMY_QUOTES.find((quote)=>{return quote.id === params.quoteId})

  if(!quote){
    return <p>No Quote Found...</p>
  }

  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`/quotes/${params.quoteId}/comments`} >
        {/* App.js의 Route에 정의된 /quotes/:quoteId <<에 exact 설정 시 url이 1:1대응에서 어긋나므로 풀어주어야함 */}
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
