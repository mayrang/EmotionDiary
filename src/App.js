import React, { useCallback, useMemo, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import './App.css';
import Home from "./Home.js";
import Edit from "./Edit.js";
import New from "./New.js";
import Diary from "./Diary.js";
import MyHeader from "./componants/MyHeader.js"
import MyButton from "./componants/MyButton";


const reducer = (state, action) => {
  let newData = [];
  switch(action.type){
    case "INIT":
      return action.data;
    case "CREATE":
      console.log(action.data)
      newData = [
        action.data,
        ...state
      ]
      break;
    case "REMOVE":
      newData = [
        state.filter((it) => it.id !== action.targetId)
      ]
      break;
    case "EDIT":
      newData = [
        state.map((it) => it.id === action.targetId ? {...action.newContent} : it)
      ]
      break;
    default:
      return state;
  }
  return newData;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatctContext = React.createContext();

const dummyData = [
  {id: 1,
  name: "박건상",
  content: "오늘의 일기 1",
  date: 1648624312816,
  emotion: 1},
  {id: 2,
  name: "김길동",
  content: "오늘의 일기 2",
  date: 1648624312817,
  emotion: 2},
  {id: 3,
  name: "홍길동",
  content: "오늘의 일기 3",
  date: 1648624312818,
  emotion: 3},
  {id: 4,
  name: "제갈길동",
  content: "오늘의 일기 4",
  date: 1648624312819,
  emotion: 1},
  {id: 5,
  name: "폰길동",
  content: "오늘의 일기 5",
  date: 1648624312820,
  emotion: 5},
  
];

function App() {


  const diaryId = useRef(parseInt(dummyData[dummyData.length -1].id)+1);
  
  const [data, dispatch] = useReducer(reducer, dummyData);

  const onCreate = useCallback((content, date, emotion) => {
    const newData = {
      id: diaryId.current,
      content,
      emotion,
      date: new Date(date).getTime()
    }
    dispatch({type: "CREATE", data: newData});
    diaryId.current += 1;
  }, []);

  const onEdit = useCallback((targetId, name, content, emotion, date) => {
    const editData = {
      id: targetId,
      name,
      content,
      emotion,
      date: new Date(date).getTime()
    }
    dispatch({type:"EDIT", data:editData});
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({type:"REMOVE", targetId: targetId})
  }, []);
  

  const memorizedDispatch = useMemo(() => {
    return {onCreate, onRemove, onEdit}; 
  }, []);


  return (
    <DiaryStateContext.Provider value={data}>
    <DiaryDispatctContext.Provider value={memorizedDispatch}>
    <BrowserRouter>
    <div className="App">
    
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/new" element={<New />} />
       <Route path="/edit" element={<Edit />} />
       <Route path="/diary" element={<Diary />} />
     </Routes>
    </div>
    </BrowserRouter>
    </DiaryDispatctContext.Provider>
    </DiaryStateContext.Provider>
    );
}

export default App;
