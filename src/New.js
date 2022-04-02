import { useEffect } from "react";
import DiaryEditor from "./componants/DiaryEditor";

const New = () => {
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = "새로 쓰기";
    }, []);
    return (
        <div>
            <DiaryEditor />
        </div>
    );
}

export default New;