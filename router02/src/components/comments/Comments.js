import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api'; 
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const {sendRequest, data: loadedComments, status} = useHttp(getAllComments);

  const { quoteId } = params;

  useEffect(()=>{
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])
  {/* 핸들러는 자식 컴포넌트 내 변수를 의존성으로 사용하기 위해 props를 통해 dril
      >> 핸들러 외부 변수인 quoteId에 따라 sendRequest의 함수가 재생성 됨
         + 자식 컴포넌트에서 핸들러를 통해 내부의 sendRequest를 실행하면, 그에 따른 리턴(status, data 등)의 변화로
           Comments 컴포넌트의 재랜더링 >> props drilling으로 전해지는 핸들러 또한 재생성 >> 무한루프
        >> useCallback을 통해 자식 컴포넌트에서 comment 추가 후 useEffect가 실행되고, 컴포넌트 재랜더링 후 status, error 의존성이 안정화가 이루어 진 후, 의존성으로 등록된 현재 핸들러 또한 같은 sendREquest, quoteId를 가진 클로저?로 넘겨지므로 무한루프 벗어날 수 있음 */}

  let comments;

  if(status === 'pending'){
    comments = <div className='centered'>
      <LoadingSpinner />
    </div>
  }

  if(status === 'completed' && loadedComments){
    comments = <CommentsList comments={loadedComments}/>
  }

  if(status === 'completed' && (!loadedComments || loadedComments.length === 0)){
    comments = <p className='centered'>No Comments were Added yet!</p>
  }
  
  return (
    <section className={styles.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler}/>}
      {/* comment 추가시 이를 렌더링하는 컴포넌트는 Comments.js의 컴포넌트이므로, 이 위치에서 함수 정의 후 props로 드릴 */}
      {comments}
    </section>
  );
};

export default Comments;
