const MarkingPage = () =>{
    return (
        <div>
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
                <div className="submitted-answer">Blue cheese</div>
                <div className="submitted-answer">Mozarella</div>
                <div className="submitted-answer">Cheddar</div>
                <div className="submitted-answer">Swiss</div>
                <div className="submitted-answer">Blue cheese</div>
                <div className="submitted-answer">Mozarella</div>
                <div className="submitted-answer">Cheddar</div>
                <div className="submitted-answer">Swiss</div>
                <div className="submitted-answer">Blue cheese</div>
                <div className="submitted-answer">Mozarella</div>
                <div className="submitted-answer">Cheddar</div>
                <div className="submitted-answer">Swiss</div>
            </div>
        </div>
    );
}

export default MarkingPage