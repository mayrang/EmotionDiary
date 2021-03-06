import React, {useCallback, useContext, useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatctContext } from "../App.js";
import MyButton from "./MyButton.js";
import MyHeader from "./MyHeader.js";
import { emtionList } from "../utils/emotionList.js";


const EmotionItem = React.memo(({onClick, emotion_id, emotion_src, emotion_description, isSelected}) => {
    return (
        <div className={["EmotionItem", isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off"].join(" ")} onClick={() => onClick(emotion_id)}>
            <img src={emotion_src} alt="error" />
            <span>{emotion_description}</span>
        </div>
    );
});


const DiaryEditor = ({isEdit, originData}) => {
    const textRef = useRef();
    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatctContext);
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [emotion, setEmotion] = useState(3);
    useEffect(()=> {
        if(isEdit){
            setContent(originData.content);
            setDate(new Date(parseInt(originData.date)).toISOString().slice(0, 10));
            setEmotion(parseInt(originData.emotion));
        }
        
    }, [originData, isEdit]);
    const changeDate = useCallback((e) => {
        setDate(e.target.value);
    }, []);
    const navigate = useNavigate();

    const clickEmotion = useCallback((id)=>{
        setEmotion(parseInt(id));
    }, []);

    const changeContent = useCallback((e) => {
        setContent(e.target.value);
    }, []);

    const handleRemove = () => {
        onRemove(parseInt(originData.id));
        navigate(-1, {replace:true});
    };

    const handleSubmit = () => {
        if(content.length < 5){
            textRef.current.focus();
            return;
        }else{
            
            if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "일기를 저장하시겠습니까?")){
                if(isEdit){
                    onEdit(parseInt(originData.id), content, emotion, date);
                    navigate("/", {replace:true})
                }else{
                    onCreate(content, date, emotion);
                    navigate("/", {replace:true});
                }
            }else{
                return;
            }
        }
    }

    return (
        <div className="DiaryEditor">
            <MyHeader headText={isEdit ? "일기 수정" : "새 일기쓰기"} leftChild={<MyButton type={"positive"} onClick={() => navigate(-1)} text={"뒤로 가기"}/>} 
            rightChild={isEdit && <MyButton type={"negative"} onClick={handleRemove} text={"삭제하기"} />}/>
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

export default React.memo(DiaryEditor);