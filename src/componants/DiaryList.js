import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem.js"
import MyButton from "./MyButton.js";

const sortDateList = [
    {value:"latest", name:"최신 순"},
    {value:"oldest", name:"오래된 순"}
];

const sortEmotionList = [
    {value: "all", name: "전부"},
    {value: "low", name: "안좋은 감정만"},
    {value: "high", name: "좋은 감정만"}
]

const ControlMenu = React.memo(({value, onChange, optionList}) => {
    return (
        <select className="ControlMenu" onChange={(e)=>onChange(e.target.value)} value={value}>
            {optionList.map((it,idx) => <option key={idx} value={it.value}>{it.name}</option>)}
        </select>
    )
});

const DiaryList = ({diaryList}) => {
    const nevigate = useNavigate();
    const [sortDate, setSortDate] = useState("latest");
    const [sortEmotion, setSortEmotion] = useState("all");


    const getProcessDiaryList = ()=>{
        const copyList = JSON.parse(JSON.stringify(diaryList));

        const filterCallBack = (item) => {
            if(sortEmotion === "high"){
                return item.emotion <= 3;
            }else if(sortEmotion === "low"){
                return item.emotion > 3;
            }
        }
        
        const filteredList = sortEmotion === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
        let sortedList = []
        if(sortDate === "latest"){
            sortedList = filteredList.sort((a, b) => parseInt(b.date) -parseInt(a.date));
        }else{
            sortedList = filteredList.sort((a,b) => parseInt(a.date) - parseInt(b.date));
        }
        return sortedList;
    }

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="right_col">
                    <ControlMenu value={sortDate} optionList={sortDateList} onChange={setSortDate} />
                    <ControlMenu value={sortEmotion} optionList={sortEmotionList} onChange={setSortEmotion}/>
                </div>
                <div className="left_col">
                    <MyButton type={"positive"} onClick={()=> {nevigate('/new')}} text={"새 일기 쓰기"} />
                </div>
            </div>
            {getProcessDiaryList().map((it)=>(
                <DiaryItem key={it.id} {...it} />
            ))}
        </div>
    );  
}

export default React.memo(DiaryList);