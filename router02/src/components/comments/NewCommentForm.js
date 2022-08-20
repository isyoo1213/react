import { useRef, useEffect } from "react";

import styles from "./NewCommentForm.module.css";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(()=>{
    if (status === 'completed'){
      onAddedComment();
    }
  }, [status, error, onAddedComment]);
  {/* onAddedComment는 부모 컴포넌트에서 props를 통해 전달
      - quoteId를 인자로 useHttp를 실행하는 addedCommentHandler 함수
      - comment 추가와 관련 없이, GET 메서드로 해당 quoteId에 대한 All comments를 받아옴
      - submit 후, sendRequest의 결과에 따른 status, error에 따라  quoteId의 모든 comments를 받아오는 함수를 재사용함
        의존성을 현재 컴포넌트의 변수들로 사용하기 위해 props dril */}

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    // optional: Could validate here

    sendRequest({commentData : { text: enteredText }, quoteId : props.quoteId});
  };

  return (
    <form className={styles.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={styles.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={styles.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
