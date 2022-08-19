import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  const {sendRequest, status} = useHttp(addQuote);
  {/* 실행하는 것이 아닌 hook으로 선언된 함수들을 가져오는 것 */}
  const history = useHistory();

  useEffect(()=>{
    if(status === 'completed'){
      history.push('/quotes');
    }
  },[status, history])
  {/* history 객체는 변하지 않을 것이지만 추가해줘야함 */}

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData)
  }

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
  )
}

export default NewQuote;