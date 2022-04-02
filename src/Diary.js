import { useContext, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "./App";
import MyButton from "./componants/MyButton";
import { emtionList } from "./utils/emotionList";
import MyHeader  from "./componants/MyHeader";


const Diary = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const diaryList = useContext(DiaryStateContext);
    useEffect(()=>{
        const targetData = diaryList.find((it) => parseInt(it.id) === parseInt(id));
        if(targetData){
            setData(targetData);
        }else{
            alert("해당되는 페이지가 없습니다.");
            navigate("/", {replace:true});
        }
    }, [id, diaryList]);
    if(!data){
        return (
            <div className="DiaryPage">
                로딩중입니다.
            </div>
        );
    }else{
        const emotion = emtionList.find((it)=> parseInt(it.emotion_id) === parseInt(data.emotion));
        return (
            <div className="DiaryPage">
                <MyHeader leftChild={<MyButton text={"뒤로 가기"} onClick={()=> navigate(-1)} type={"default"} />}
                headText={new Date(data.date).toISOString().slice(0,10)} rightChild={<MyButton text={"수정하기"} onClick={()=> navigate(`/edit/${id}`)}/>} />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${emotion.emotion_id}`].join(" ")}>
                            <img src={process.env.PUBLIC_URL + `/assets/emotion${emotion.emotion_id}.png`} alt="error"/>
                            <div className="emotion_description">
                                {emotion.emotion_descripttion}
                            </div>
                        </div>
                    </section>
                </article>
                <article>
                    <section>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
    
}

export default Diary;