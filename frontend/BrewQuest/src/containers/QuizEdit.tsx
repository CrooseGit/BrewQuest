import BackButton from '../components/BackButton/BackButton';

import { Link } from "react-router-dom";
import './QuizEdit.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const QuizEdit = () => {


  const [originalQuestions, setOriginalQuestions] = useState([{ "num": 1, "question": "w", "answer": "a" }, { "num": 2, "question": "w", "answer": "m" }, { "num": 3, "question": "wsadj", "answer": "t" }]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState([{ "num": 1, "question": "w", "answer": "a" }, { "num": 2, "question": "w", "answer": "m" }, { "num": 3, "question": "wsadj", "answer": "t" }]);
  const [buttonClasses, setButtonClasses] = useState(questions.map((q, index) => {
    if (index === 0) {
      return "btn selectedButton"

    }
    else {
      return "btn questionButton"
    }
  }))
  useEffect(() => {
    console.log("heeeeeellllllooooo")
    //'http://127.0.0.1:8000/QuizEditsAPI/get-questions/'
    axios.get('http://127.0.0.1:8000/testdb/get-questions/')
      .then(response => {
        setQuestions(response.data.message);
        //setOriginalQuestions(response.data.message);
        
      })
      .catch(error => {
        console.log("noooooooooooooooo")
        console.log(error);
      });
    setCurrentQuestion(1);
  }, []);



  const saveNewQuestions = () => {
    //delete all questions from database
    axios.delete('http://127.0.0.1:8000/testdb/delete-all-questions/').then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
    //add new questions
    axios.post('http://127.0.0.1:8000/testdb/add-all-questions/', {
      questions: questions
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    
  }

  const handleBackButtonClick = () => {
    // Replace this with actual functionality when other view exists
    console.log('Going Back');
  };


  const handleQuestionChange = useEffect(() => {
    
    const values = questions.map((q, index) => {
      if (q["num"] === currentQuestion) { return "btn selectedButton" }
      else { return "btn questionButton" }
    })
    setButtonClasses(values);
  }, [currentQuestion]);

  const getNewAnswers = (event: any) => {
    let newQuestions: { "num": number, "question": string, "answer": string }[] = [];

    questions.forEach((q, index) => {
      if (q["num"] === currentQuestion) {
        newQuestions.push({ "num": q["num"], "question": q["question"], "answer": event.target.value });
      }
      else {
        newQuestions.push(q);
      }
    })

    setQuestions(newQuestions);

  }

  const addQuestion = () => {
    setQuestions([...questions, { "num": questions.length + 1, "question": "empty", "answer": "mt" }]);
  }

  const removeQuestion = () => {
    setQuestions(questions.filter((q, index) => {
      if (questions.length === 1) {
        return true
      }
      setCurrentQuestion(currentQuestion > 1 ? currentQuestion - 1 : 1);
      if (q["num"] === currentQuestion) { return false }
      else { return true }
    }).map((q, index) => {
      return { "num": index + 1, "question": q["question"], "answer": q["answer"] }
    }))
  }


  return (
    <div className='box'>
      <div className='header'>
        <Link to="../"><BackButton onClick={handleBackButtonClick} className='text' /></Link>
        <h1 className='title'>Quiz Title</h1>
        <button onClick={()=>console.log(questions)}>Save & Exit</button>
      </div>

      <div className='round'>
        <form>
          <option value="1">Round 1</option>
          <option value="2">Round 2</option>
          <option value="3">Round 3</option>
        </form>
      </div>
      <div className='scrollMenu'>

        <button type='button'
          key="addQ"
          className="btn btn-success"
          id="addQ"
          onClick={addQuestion}
        >
          <h4>{"addQ"}</h4>
        </button>

        <button type='button'
          key="removeQ"
          className="btn btn-success"
          id="removeQ"
          onClick={removeQuestion}
        >
          <h4>{"removeQ"}</h4>
        </button>

        {questions.map((arr, index) => {
          return (
            <button type='button'
              key={arr["num"]}
              className={buttonClasses[index]}
              id={arr["num"].toString()}
              onClick={() => setCurrentQuestion(arr["num"])}>

              <h4>{"Q" + arr["num"].toString()}</h4>
            </button>
          );
        })}
      </div>



      <div className='question'>
        <form>Question: {questions[currentQuestion - 1]["question"]}</form>
        <form

          id="questionInput"
          defaultValue={"What's the capital of Switzerland?"}
        />
      </div>

      <div className='questionDiv'>

        <div>
          <form>
            <input
              id='textInput'
              type='text'
              className='form-control'
              placeholder='Your answer goes here...'
              value={questions[currentQuestion - 1]["answer"]}
              onChange={getNewAnswers}
            />
          </form>
        </div>
        {/*
        <div className='d-flex justify-content-center'>
          <button type='button' className='btn btn-lg submitButton'>
            <h2 className='text'>SaveQuestion</h2>
          </button>
        </div>
        */
        }
      </div>

      <div className='d-flex justify-content-between navigationButtons'>
        <div className='p-2'>
          <button type='button' className='btn btn-lg' onClick={() => setCurrentQuestion(currentQuestion > 1 ? currentQuestion - 1 : currentQuestion)}>
            <h3>&lt; Back</h3>
          </button>
        </div>
        <div className='p-2'>
          <button type='button' className='btn btn-lg' onClick={() => setCurrentQuestion(questions.length > currentQuestion ? currentQuestion + 1 : currentQuestion)}>
            <h3>Next &gt;</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizEdit;
