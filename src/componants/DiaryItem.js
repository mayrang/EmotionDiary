import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({id, name, content, emotion, date}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";

    const navigate = useNavigate();
    const getEdit = () => {
        navigate(`/edit/${id}`);
    }

    const getDiary = () => {
        navigate(`/diary/${id}`);
    }
    const strDate = new Date(parseInt(date)).toLocaleDateString();
    return (
        <div className="DiaryItem">
            <div onClick={getDiary} className={["emotion_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
                <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="error"/>

            </div>
            <div onClick={getDiary} className="info_wrapper">
                <div className="diary_date">
                    {strDate}
                </div>
                <div className="diary_content_preview">
                    {content}
                </div>
            </div>
            <div className="btn_wrapper">
                <MyButton type={"default"} onClick={getEdit} text={"수정하기"} />
            </div>
        </div>
    );
}

export default React.memo(DiaryItem);