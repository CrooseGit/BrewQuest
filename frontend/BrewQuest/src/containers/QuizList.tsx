
import HostButton from './HostButton';
import axios from "axios";
import {useState, useEffect} from 'react';
import OptionButton from '../components/OptionButton/OptionButton';

// import OptionButton from './OptionButton.tsx';


const QuizList = () => {
    // set up items list structure
    // sample quiz array
    const [quizzes, setQuizzes] = useState([
        {id: 1, title: "dsjifopasidj jpodi jsapofij dspoij faspoid jfposaidj fpoi jposifdj poasid jfpoiasj dpofij saopidf jposiajdfposiaj fopdij ospfi japsfodij dsjifopasidj jpodi jsapofij dspoij faspoid jfposaidj fpoi jposifdj poasid jfpoiasj dpofij saopidf jposiajdfposiaj fopdij ospfi japsfodij dsjifopasidj jpodi jsapofij dspoij faspoid jfposaidj fpoi jposifdj poasid jfpoiasj dpofij saopidf jposiajdfposiaj fopdij ospfi japsfodij"},
        {id: 2, title: "Second quiz"},
        {id: 3, title: "Third quiz"}
    ]);

    const [isVisible, setIsVisible] = useState(false);
    function Options() {
        return (
            <div>
                {isVisible ? (
                    <ul>
                        <li><button>Duplicate</button></li>
                        <li><button>Edit</button></li>
                        <li><button>Delete</button></li>
                    </ul>
                ) : null}
            </div>
        );
        }

    const handleOptionButtonClick= () => {
        // Replace this with actual functionality when other view exists
        setIsVisible(!isVisible);

    }

    //set selected item structure
    const [selectedQuiz, setSelectedQuiz] = useState({});

    // //load items from database
    // useEffect( () => {
    //     //HTTP GET request
    //     axios.get('/api/items') //change path for database
    //     // quizzes obtained
    //     .then((response) => { setQuizzes(response.data) }) //change path
    //     //catch error message
    //     .catch((error) => { console.error(error, ": error fetching data") } );
    // },[]
    // );

    useEffect(() => {
        console.log(selectedQuiz);
    });

    const quizElements = quizzes.map(
        (quizItem) => (
            [
                <input
                    key={quizItem.id}
                    type="radio"
                    className="btn-check quiz-item-input"
                    name="quizList"
                    id={quizItem.id.toString()}
                    // called when item is selected and selected item has changed
                    onChange={() => setSelectedQuiz(quizItem)}></input>,

                <label className="btn quiz-item-selection" htmlFor={quizItem.id.toString()}>
                    <div className='quiz-item-title'>{quizItem.title}</div><OptionButton></OptionButton>
                </label>
            ]
        )
    );

    console.log(quizElements);
    

    return (
        // display each list item
        <div className="btn-group-vertical quiz-button-group" role="group">

            <label className="btn quiz-list-head">Quizzes</label>
            {quizElements.flat()}

        </div>
    );
};

export default QuizList;