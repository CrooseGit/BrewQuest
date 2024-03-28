import { useState } from "react";
import { useEffect } from "react";
import SubmittedAnswer from "./SubmittedAnswer";

const MarkingPage = () =>{

    // current
    const [questionTitle, setQuestionTitle] = useState("The selected question to be swiped on (left or right)");
    // default to 1
    const [roundNum, setRoundNum] = useState(1);
    const [questionNum, setQuestionNum] = useState(1);

    // for rendering radio elements (FETCH FROM DATABASE)
    const [roundsPerQuiz, setRoundsPerQuiz] = useState(0);
    const [questionsPerRound, setQuestionsPerRound] = useState(0);

    // initialize variables
    useEffect(()=>{
        //from database (message for backend: may just use useState hook to initialize)
        console.log("Only for the first time, fetch roundsPerQuiz and questionsPerRound from database");
        console.log("Fetch question and answers");
        //test data
        setRoundsPerQuiz(3);
        setQuestionsPerRound(8);
    },[]);

    // when roundNum is changed
    useEffect(()=>{
        console.log("Fetch questionsPerRound");
        console.log("Initialize questionNum to 1");
        console.log("Fetch new questionTitle and submittedAnswers");
    },[roundNum]);

    //when questionNum is changed
    useEffect(()=>{
        console.log("Fetch new questionTitle and submittedAnswers");
    },[questionNum]);

    // ALL TO BE FETCHED FROM DATABASE !!!!!!!!!!!
    // answers object
    // IMPORTANTL: id for each submitted answer to a question, used for HTML element and key
    // player to identify player, which player submitted the answer (might be in different order than id)
    // should fetch each time questionNum or roundNum variable changes, using useEffect
    const [submittedAnswers, setSubmittedAnswers] = useState([
        {id: 1, player: 2, contents: "happy birthday to you happy birthday to you happy"},
        {id: 2, player: 1, contents: "She sells sea shells by the sea shore but they're just picking shells up off the floor"},
        {id: 3, player: 3, contents: "Cheddar"},
        {id: 4, player: 4, contents: "Swiss"},
        {id: 5, player: 5, contents: "Blue cheese"},
        {id: 6, player: 6, contents: "Mozarella"},
        {id: 7, player: 7, contents: "Cheddar"},
        {id: 8, player: 8, contents: "Swiss"},
        {id: 9, player: 9, contents: "Blue cheese"},
        {id: 10, player: 10, contents: "Mozarella"},
        {id: 11, player: 11, contents: "Cheddar"},
        {id: 12, player: 12, contents: "Swiss"}
    ]);

    // change variable
    const changeQSelection = (e) => {
        // value contains question number
        setQuestionNum(parseInt(e.target.value));
    }

    // render question radio elements
    let questionButtons = [];
    for (let i=1; i <= questionsPerRound; i++){
        if (i===1){
            questionButtons.push(
                <input key={"QSI"+i} type="radio" value={i} className="question-selection-input" name="questionList" id={"QS"+i} defaultChecked onChange={changeQSelection}></input>
            );
            questionButtons.push(
                <label key={"QSL"+i} className="question-selection-label" htmlFor={"QS"+i}>Q{i}</label>
            );
        } else {
            questionButtons.push(
                <input key={"QSI"+i} type="radio" value={i} className="question-selection-input" name="questionList" id={"QS"+i} onChange={changeQSelection}></input>
            );
            questionButtons.push(
                <label key={"QSL"+i} className="question-selection-label" htmlFor={"QS"+i}>Q{i}</label>
            );
        }
    }

    // render round selection elements
    let roundSelection = [];
    for (let i=1; i<=roundsPerQuiz; i++){
        roundSelection.push(
            <button>Round {i}</button>
        );
    }

    // remove element from list
    const handleDelete = (element) => {

        // IMPORTANT: functional setState update approach to ensure latest submittedAnswers value is used
        setSubmittedAnswers(submittedAnswers=>submittedAnswers.filter((answer) => answer !== element));

    }

    // render submitted answer elements
    const submittedAnswerElements = submittedAnswers && submittedAnswers.map((submittedAnswer)=>
    <SubmittedAnswer roundNum={roundNum} questionNum={questionNum} submittedAnswer={submittedAnswer} handleDelete={handleDelete} key={submittedAnswer.id}></SubmittedAnswer>
    );

    return (
        <div className="marking-page-div">
            <h1 className="branding-heading">BrewQuest</h1>
            <div className="round-questions">
                {/* to fetch from database */}
                <div className="round-dpdn">
                    <button className="round-dpdn-btn">Round {roundNum}</button>
                    <div className="round-dpdn-menu">
                        {roundSelection}
                    </div>
                </div>
                <div className="question-selection-container">
                    {/* to fetch from database */}
                    {/* display radio buttons */}
                    {questionButtons}
                </div>
            </div>
            <h2 className="marked-question">{questionTitle}</h2>
            {/* arrows to indicate swipe */}
            <div className="arrow-guide left-arrow">&#8592;</div>
            <div className="arrow-guide right-arrow">&#8594;</div>
            <div className="submitted-answers-list">
                {/* answers to be fetched from database */}
                {submittedAnswerElements}
            </div>
        </div>
    );
}

export default MarkingPage