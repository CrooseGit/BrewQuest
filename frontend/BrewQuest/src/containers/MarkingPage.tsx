import { useState } from "react";
import { useEffect } from "react";
import SubmittedAnswer from "./SubmittedAnswer";

const MarkingPage = () =>{

    // answers object
    // id for each submitted answer to a question, unique id
    // player to identify player, which player submitted the answer (might be in different order than id)
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

    // for identifying unique html elements
    let roundNum=1, questionNum=1;

    // react to dynamic list of submitted answers
    useEffect(()=>{},[submittedAnswers]);

    // remove element from list
    const handleDelete = (element) => {
        const newAnswersList = submittedAnswers.filter((answer) => answer !== element);
        setSubmittedAnswers(newAnswersList);
    }

    return (
        <div className="marking-page-div">
            <h1 className="branding-heading">BrewQuest</h1>
            <div className="round-questions">
                {/* to fetch from database */}
                <h2 className="round-subtitle">Round X</h2>
                <div className="question-selection-container">
                    {/* to fetch from database */}
                    <div className="question-selection">Q1</div>
                    <div className="question-selection">Q2</div>
                    <div className="question-selection">Q3</div>
                    <div className="question-selection">Q4</div>
                    <div className="question-selection">Q5</div>
                    <div className="question-selection">Q6</div>
                    <div className="question-selection">Q7</div>
                    <div className="question-selection">Q8</div>
                    <div className="question-selection">Q9</div>
                    <div className="question-selection">Q10</div>
                </div>
            </div>
            <h2 className="marked-question">The selected question to be swiped on &#40;left or right&#41;</h2>
            {/* arrows to indicate swipe */}
            <div className="arrow-guide left-arrow">&#8592;</div>
            <div className="arrow-guide right-arrow">&#8594;</div>
            <div className="submitted-answers-list">
                {/* answers to be fetched from database */}
                {submittedAnswers && submittedAnswers.map((submittedAnswer)=>[
                <SubmittedAnswer roundNum={roundNum} questionNum={questionNum} submittedAnswer={submittedAnswer} onDelete={handleDelete} key={submittedAnswer.id}></SubmittedAnswer>]
                )}
            </div>
        </div>
    );
}

export default MarkingPage