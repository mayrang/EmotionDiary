import {useState, useContext, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "./App";
import DiaryEditor from "./componants/DiaryEditor";


const Edit = () => {
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const [originData, setOriginData] = useState();

    const navigete = useNavigate();
    console.log("test")
    useEffect(()=>{
        if(diaryList.length > 1){
            const targetData = diaryList.find((it)=>(it.id) === parseInt(id));
            if(targetData){
                setOriginData(targetData);
            }else{
                alert("해당되는 페이지가 없습니다.");
                navigete("/", {replace:true});
            }
        }
        
    },[diaryList, id]);
    console.log(originData);
    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData}/>}
        </div>
    );
}

export default Edit;