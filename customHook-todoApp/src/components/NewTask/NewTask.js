import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: "https://customhook-todo-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
    );
    {/* createTask는 호출 즉시 실행되는 함수가 아닌, useHttp컴포넌트 내에서 실제 함수가 호출되어 실행될 때
        data 인자가 전달되어 실행
        첫 인자 - 실행이 예정된 함수에서 this 예약어를 사용하는 것 - 여기에서는 필요없음
        호출 예정인 함수(createTask)가 호출되어 실행되기 전 바인딩 해야 할 첫 인자) */}

    // setIsLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(
    //     "https://customhook-todo-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({ text: taskText }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Request failed!");
    //   }

    //   const data = await response.json();

    //   const generatedId = data.name; // firebase-specific => "name" contains generated id
    //   const createdTask = { id: generatedId, text: taskText };

    //   props.onAddTask(createdTask);
    // } catch (err) {
    //   setError(err.message || "Something went wrong!");
    // }
    // setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
