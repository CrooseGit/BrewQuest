import './QuizList.css';
// npm install axios
import axios from "axios";
import React, {useState, useEffect} from 'react';

const QuizList = () => {
    // set up items list structure
    // quizzes is an array
    const [quizzes, setQuizzes] = useState([]);

    //set selected item structure
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    //load items from database
    useEffect( () => {
        //HTTP GET request
        axios.get('/api/items') //change path of database
        // order of quizzes obtained
        .then((response) => { setQuizzes(response.data) }) //change path
        //catch error message
        .catch((error) => { console.error(error, ": error fetching data") } );
    }
    ,[]
    );

    // on click, this will be run
    const handleItemChange = (item) => {
        setSelectedQuiz(item);
        console.log(item);
    };

    

    return (
        <div>
            <h2 className="list-head">Quizzes</h2>
            {/* display each list item */}
            {/* <ul>
                {
                    quizzes.map(
                        // display each list item
                        (quizItem) => (
                            <li className="list-item" key={quizItem.id}>
                                <label>
                                    <input
                                    type="radio"
                                    name={quizzes}
                                    value={quizItem.id}
                                    // called when item is selected and selected item has changed
                                    onChange={() => handleItemChange(quizItem)}/>
                                    {quizItem.name}
                                </label>
                            </li>
                        )
                    )
                }
            </ul> */}

            {/* sample list items */}
            <ul>
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
                    </label>
                    Second quiz
                </li>
                <li className="list-item" key="3">
                    <label>
                        <input type="radio" name={"quizzes"} value={1}
                        onChange={() => handleItemChange("quizItem 3")}/>
                        Third quiz
                    </label>
                </li>
            </ul>
            
        </div>
    );
};

export default QuizList;