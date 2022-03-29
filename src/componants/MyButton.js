
const MyButton = ({type, onClick, text}) => {

    const button_type = ["positive", "negative"].includes(type) ? type : "default";
    return (
        <button className={["MyButton", `MyButton_${button_type}`].join(" ") }
        onClick={onClick}>{text}</button>
    );
}

export default MyButton;