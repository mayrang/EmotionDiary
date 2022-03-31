import { useCallback, useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "./App";
import MyButton from "./componants/MyButton";
import MyHeader from "./componants/MyHeader";
import DiaryList from "./componants/DiaryList.js"


const Home = () => {
    const diaryList = useContext(DiaryStateContext);
    const [data, setData] = useState([]);
    const [month, setMonth] = useState(new Date());
    console.log(diaryList);
    const headText = `${month.getFullYear()}년 ${month.getMonth()}월`

    useEffect(()=>{
        const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getTime();
        const lastDay = new Date(month.getFullYear(), month.getMonth()+1, 0).getTime();
        setData(diaryList.filter((it)=>firstDay <= it.date <= lastDay));
    }, [diaryList, month]);

    const monthIncrease = useCallback(() => {
        setMonth(new Date(month.getFullYear(), month.getMonth()+1));
    }, [month]);

    const monthDecrease = useCallback(() => {
        setMonth(new Date(month.getFullYear(), month.getMonth()-1));
    }, [month]);
    return (
        <div>
            <MyHeader leftChild={<MyButton text={"<"} onClick={monthDecrease} />} headText={headText} rightChild={<MyButton text={">"} onClick={monthIncrease} />} />
            <DiaryList diaryList={data} />
        </div>
    );
}

export default Home;