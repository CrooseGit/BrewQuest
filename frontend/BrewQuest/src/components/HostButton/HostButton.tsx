import { useNavigate } from "react-router-dom";


type HostButtonProps = {
    quizToHost: {},
    setQuizToHost: React.Dispatch<React.SetStateAction<{title:string, id:number}>>
}


const HostButton = (props:{quizToHost: {title:string, id:number}, 
    setHostToLobby: React.Dispatch<React.SetStateAction<boolean>>}) => {
    
    const hostButtonClicked = () => {
        if (props.quizToHost.id!==-1 && props.quizToHost.title!=='Loading') {

            props.setHostToLobby(true);
            
        }

        
      }
    return (
            <button onClick={hostButtonClicked} type="button" className="btn btn-secondary host-quiz">Host Quiz</button>
    );
}

export default HostButton