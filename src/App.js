import React, { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
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
      newData = state.filter((it) => it.id !== action.targetId);
      break;
    case "EDIT":
      newData =  state.map((it) => it.id === action.data.id ? {...action.data} : it)
      
      console.log(newData);
      break;
    default:
      return state;
  }
  localStorage.setItem("Diary", JSON.stringify(newData));
  return newData;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatctContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const diaryId = useRef(1);
  useEffect(()=> {
    const localData = localStorage.getItem("Diary");
    if(localData){
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
      dispatch({type:"INIT", data: diaryList});
      diaryId.current = parseInt(diaryList[0].id + 1);
    }
  }, []);

 
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

  const onEdit = useCallback((targetId, content, emotion, date) => {
    const editData = {
      id: targetId,
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
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/diary/:id" element={<Diary />} />
     </Routes>
    </div>
    </BrowserRouter>
    </DiaryDispatctContext.Provider>
    </DiaryStateContext.Provider>
    );
}

export default App;
