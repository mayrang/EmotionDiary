import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import './App.css';
import Home from "./Home.js";
import Edit from "./Edit.js";
import New from "./New.js";
import Diary from "./Diary.js";
import MyHeader from "./componants/MyHeader.js"
import MyButton from "./componants/MyButton";


function App() {
  return (
    <BrowserRouter>
    <MyHeader headText={"App"} leftChild={<MyButton type={"default"} onClick={()=>alert("왼쪽버튼 클릭")} text={"왼쪽버튼"} />} rightChild={<MyButton type={"default"} onClick={()=>alert("오른쪽버튼 클릭")} text={"오른쪽버튼"} />}/>
    <div className="App">
      <MyButton type={"positive"} onClick={()=>alert("긍정버튼 클릭")} text={"긍정"} />
      <MyButton type={"negative"} onClick={()=>alert("부정버튼 클릭")} text={"부정"} />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/new" element={<New />} />
       <Route path="/edit" element={<Edit />} />
       <Route path="/diary" element={<Diary />} />
     </Routes>
    </div>
    </BrowserRouter>
    );
}

export default App;
