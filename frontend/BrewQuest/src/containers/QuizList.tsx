import axios from "axios";
import {useState, useEffect} from 'react';
import OptionButton from '../components/OptionButton/OptionButton';
import '../index.css'



// import OptionButton from './OptionButton.tsx';


const QuizList = () => {
    // set up items list structure
    // sample quiz array

    const [quizzes, setQuizzes] = useState(['Loading']);

    //set selected item structure
    const [selectedQuiz, setSelectedQuiz] = useState({});

    useEffect(() => {
        axios
          .get('http://localhost:8000/api/quizzes/')
          .then((response) => {
            setQuizzes(response.data.quizzes);
          })
          .catch((error) => {
            console.log(error);
          });
      });
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

    
    const quizElements = quizzes && quizzes.map(
        (quizItem, index) => (
            [
                <input
                    key={'quiz_' + index}
                    type="radio"
                    className="btn-check quiz-item-input"
                    name="quizList"
                    id={index.toString()}
                    // called when item is selected and selected item has changed
                    onChange={() => setSelectedQuiz(quizItem)}></input>,

                <label className="btn quiz-item-selection" htmlFor={index.toString()}>
                    <div className='quiz-item-title'>{quizItem}</div><OptionButton></OptionButton>
                </label>
            ]
        )
    );

    console.log(quizElements);
    

    return (
        // display each list item
        <div className="btn-group-vertical quiz-button-group" role="group">

            <label className="btn quiz-list-head">Quizzes</label>
            {quizElements}

        </div>
    );
};

export default QuizList;