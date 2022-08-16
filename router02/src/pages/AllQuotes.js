import QuoteList from '../components/quotes/QuoteList';

const DUMMY_QUOTES = [
  {id: 'q1', author: 'koala', text: 'Eat, Sleep, Pee & Poo!'},
  {id: 'q2', author: 'insung', text: 'Eat, Sleep, Code!'},
  {id: 'q3', author: 'dog', text: 'Eat, Sleep, Bark!'}
] 

const AllQuotes = () => {
  return (
    <QuoteList quotes={DUMMY_QUOTES} />
  )
}

export default AllQuotes;