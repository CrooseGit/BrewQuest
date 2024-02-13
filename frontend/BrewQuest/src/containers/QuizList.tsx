import './QuizList.css';
import HostButton from './HostButton';
import axios from "axios";
import {useState, useEffect} from 'react';
import OptionButton from '../components/OptionButton/OptionButton';
import QuizListItem from './QuizListItem.tsx'



const QuizList = () => {
    // set up items list structure
    // sample quiz array
    const [quizzes, setQuizzes] = useState([
        {id: 1, title: "First quiz"},
        {id: 2, title: "Second quiz"},
        {id: 3, title: "Third quiz"}
    ]);

    const handleOptionButtonClick= () => {
        // Replace this with actual functionality when other view exists
        console.log('Going Back');
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
                    className="btn-check"
                    name="quizList"
                    id={quizItem.id.toString()}
                    // called when item is selected and selected item has changed
                    onChange={() => setSelectedQuiz(quizItem)}></input>,
                <label className="btn btn-outline-success quiz-item-label" htmlFor={quizItem.id.toString()}>{quizItem.title}</label>,
                <OptionButton onClick={handleOptionButtonClick} className='inline-option-button'/>
            ]
        )
    );

    console.log(quizElements);
    

    return (
        <div>

            <h2 className="list-head">Quizzes</h2>
            {/* display each list item */}
            <div className="list-item btn-group-vertical" role="group">

                {quizElements.flat()}

            </div>
            
        </div>
    );
};

export default QuizList;