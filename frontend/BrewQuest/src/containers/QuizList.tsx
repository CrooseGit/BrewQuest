import './QuizList.css';
import axios from "axios";
import {useState, useEffect} from 'react';
import OptionButton from '../components/OptionButton/OptionButton';



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
    

    return (
        <div>
            <h2 className="list-head">Quizzes</h2>
            {/* display each list item */}
            <div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group"><ul className="list-item">
                {
                    quizzes.map(
                        // display each list item
                        (quizItem) => (
                            <li key={quizItem.id}>
                                <input
                                type="radio"
                                className="btn-check"
                                name="quizList"
                                id={quizItem.id.toString()}
                                // called when item is selected and selected item has changed
                                onChange={() => setSelectedQuiz(quizItem)}></input>
                                <label className="btn btn-outline-success quiz-item-label" htmlFor={quizItem.id.toString()}>{quizItem.title}</label>
                                <OptionButton onClick={handleOptionButtonClick}/>
                            </li>
                        )
                    )
                }
            </ul></div>

            {/* sample list items */}
            {/* <ul>
                <li className="list-item" key="1">
                    <label>
                        <input type="radio" name={"quizzes"} value={1}
                        onChange={() => handleItemChange("quizItem 1")}/>
                        First quiz
                    </label>
                </li>
                <li className="list-item" key="2">
                    <label>
                        <input type="radio" name={"quizzes"} value={1}
                        onChange={() => handleItemChange("quizItem 2")}/>
                        Second quiz
                    </label>
                </li>
                <li className="list-item" key="3">
                    <label>
                        <input type="radio" name={"quizzes"} value={1}
                        onChange={() => handleItemChange("quizItem 3")}/>
                        Third quiz
                    </label>
                </li>
            </ul> */}
            
        </div>
    );
};

export default QuizList;