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
      newData = [
        ...action.data,
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

const DiaryStateContext = React.createContext();
const DiaryDispatctContext = React.createContext();


function App() {

  const diaryId = useRef(1);

  const [data, dispatch] = useReducer(reducer, []);


  const onCreate = useCallback((name, content, date, emotion) => {
    const newData = {
      id: diaryId.current,
      name,
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
