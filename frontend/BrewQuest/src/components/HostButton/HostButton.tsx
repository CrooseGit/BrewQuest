import { useNavigate } from "react-router-dom";


type HostButtonProps = {
    quizToHost: {};
}
const HostButton = (props:{quizToHost: {title:string, id:number}}) => {
    const navigate = useNavigate();
    const hostButtonClicked = () => {
        if (props.quizToHost.id!==-1 && props.quizToHost.title!=='Loading') {

            navigate('/host/hostLobby'); // bad code
            
        }
        
      }
    return (
            <button onClick={hostButtonClicked} type="button" className="btn btn-secondary host-quiz">Host Quiz</button>
    );
}

export default HostButton