import React, { useEffect, useState, useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const httpData = useHttp();

  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  useEffect(() => {
    const transformTasks = (taskObj) => {
      const loadedTasks = [];
  
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {url: "https://customhook-todo-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json"},         transformTasks
    );
  }, [fetchTasks]);
  {
    /* 현재 상태에서 fetchTasks를 의존성에 추가하면 무한루프 이슈 발생 
       - fetchTasks는 useHttps의 sendRequest를 실행 >> sendRequest 내의 state들의 변화(setIsLoading, setError)
      >> 커스텀 훅을 사용하는 app 컴포넌트에서도 묵시적으로 state를 사용 >> app컴포넌트의 재평가
      >> 재평가되는 순간 커스텀 훅이 다시 호출 >> sendRequest 재생성 >> 새로운 함수 객체 반환
      >> sendRequest를 useCallbak()으로 감싸주기*/
  }

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks items={tasks} loading={isLoading} error={error} onFetch={null} />
    </React.Fragment>
  );
}

export default App;
