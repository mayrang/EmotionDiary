import {useContext, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatctContext } from "../App.js";
import MyButton from "./MyButton.js";
import MyHeader from "./MyHeader.js";

const emtionList =[
    {   emotion_id: 1,
        emotion_src: process.env.PUBLIC_URL + "/assets/emotion1.png",
        emotion_descripttion: "매우 좋음"},
    {
        emotion_id: 2,
        emotion_src: process.env.PUBLIC_URL + "/assets/emotion2.png",
        emotion_descripttion: "좋음"
    },
    {
        emotion_id: 3,
        emotion_src: process.env.PUBLIC_URL + "/assets/emotion3.png",
        emotion_descripttion: "그럭저럭" 
    },
    {
        emotion_id: 4,
        emotion_src: process.env.PUBLIC_URL + "/assets/emotion4.png",
        emotion_descripttion: "별루"
    },
    {
        emotion_id: 5,
        emotion_src: process.env.PUBLIC_URL + "/assets/emotion5.png",
        emotion_descripttion: "끔찍함"
    }
]

const EmotionItem = ({onClick, emotion_id, emotion_src, emotion_description, isSelected}) => {
    return (
        <div className={["EmotionItem", isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off"].join(" ")} onClick={() => onClick(emotion_id)}>
            <img src={emotion_src} alt="error" />
            <span>{emotion_description}</span>
        </div>
    );
}


const DiaryEditor = () => {
    const textRef = useRef();
    const {onCreate} = useContext(DiaryDispatctContext);
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [emotion, setEmotion] = useState(3);
    const changeDate = (e) => {
        setDate(e.target.vlaue);
    }
    const navigate = useNavigate();

    const clickEmotion = (id)=>{
        setEmotion(parseInt(id));
    }

    const changeContent = (e) => {
        setContent(e.target.value);
    }

    const handleSubmit = () => {
        if(content.length < 5){
            textRef.current.focus();
            return;
        }else{
            

            onCreate(content, date, emotion);
            navigate("/", {replace:true});
        }
    }

    return (
        <div className="DiaryEditor">
            <MyHeader headText={"새 일기쓰기"} leftChild={<MyButton type={"positive"} onClick={() => navigate(-1)} text={"뒤로 가기"}/>} />
            <section>
                <div className="input_box">
                    <h4>오늘은 며칠인가요?</h4>
                    <input className="input_date" type="date" value={date} onChange={changeDate} />
                </div>
            </section>
            <section>
                <div className="input_box emotion_list_wrapper">
                {emtionList.map((it) => 
                    <EmotionItem key={it.emotion_id} onClick={clickEmotion} {...it} isSelected={it.emotion_id === emotion}/>
                )}
                </div>
            </section>
            <section>
                <div className="input_box">
                    <textarea ref={textRef} placeholder="오늘의 일기를 적어주세요" value={content} onChange={changeContent} />

                </div>
            </section>
            <section>
                <div className="input_box control_box">
                    <MyButton type={"default"} onClick={()=> navigate(-1)} text={"뒤로가기"} />
                    <MyButton type={"positive"} onClick={handleSubmit} text={"저장하기"} />
                </div>
            </section>
        </div>
    );
}

export default DiaryEditor;