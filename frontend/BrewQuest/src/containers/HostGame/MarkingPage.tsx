import { useState } from 'react';
import { useEffect } from 'react';
import SubmittedAnswer from '../../components/SubmittedAnswer/SubmittedAnswer';
import BackButton from '../../components/BackButton/BackButton';
import { Link } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from 'axios';
import QuestionButtonsHostMarking from './QuestionButtonsHostMarking/QuestionButtonsHostMarking';
interface props {
  room: string;
  quizId: number;
  quizTitle: string;
  deleteRoom: () => void;
  client: W3CWebSocket;
  livequizhttp: string;
}
const MarkingPage = ({ room, quizId, quizTitle, deleteRoom, client, livequizhttp }: props) => {
  // Message for backend: look at console to know what to do
  // Initialize roundsPerQuiz, questionsPerRound, questionTitle, submittedAnswers from database
  // current

  const [questionTitle, setQuestionTitle] = useState(
    'The selected question to be swiped on (left or right)'
  );
  const [modelAnswer, setModelAnswer] = useState('Model Answer: 0');
  // default to 1
  const [roundNum, setRoundNum] = useState(1);
  const [questionNum, setQuestionNum] = useState(0);

  // for rendering radio elements (FETCH FROM DATABASE)
  const [roundsPerQuiz, setRoundsPerQuiz] = useState(3);
  const [questionsPerRound, setQuestionsPerRound] =
    useState<{ round_index: number, question_count: number }[]>([{ round_index: 0, question_count: 0 }]);


  //const [questionButtons, setQuestionButtons] = useState<JSX.Element[]>([<></>]);

  const [submittedAnswers, setSubmittedAnswers] =
    useState<{ button_id: string, id: number, player_id: number, question_index: number, round_index: number, contents: string }[]>([]);
  // answers object
  // IMPORTANTL: id for each submitted answer to a question, used for HTML element and key
  // player to identify player, which player submitted the answer (might be in different order than id)
  // should fetch each time questionNum or roundNum variable changes, using useEffect


  // 'QS'+(L/I/null)+'_'+<question index>+'_'+<round index>

  const getQuestionsToMark = async () => {
    const payload = { pin: room }

    axios.post(livequizhttp + "getQuestionsToMark/", payload)
      .then((response) => {
        if (response.data.status == "success") {

          /* structure of response.data.data records: 

          * Object { id: number, player_id: number, answer: string, 
          * question: Object { index: number, prompt: string", answer: string,
          * round_id: Object { id: number, round_index: number, title: string }}}

          */
          // ps dont ask me y round_id is not just called round this is what the field is in the database

          setSubmittedAnswers([]);

          // submittedAnswers type
          // { id: number, player_id: number, question_index: number, round_index: number, contents: string }[]

          response.data.data.forEach((
            element: {
              id: number, player_id: number, answer: string,
              question: {
                index: number, prompt: string, answer: string,
                round_id: { id: number, index: number, title: string }
              }
            }
          ) => {
            console.log({
              button_id: 'QS' + "_" + element.question.index + "_" + element.question.round_id.index,
              id: element.id, player_id: element.player_id, question_index: element.question.index,
              round_index: element.question.round_id.index, contents: element.answer
            });
            setSubmittedAnswers(prev => [...prev,
            {
              button_id: 'QS' + "_" + element.question.index + "_" + element.question.round_id.index,
              id: element.id, player_id: element.player_id, question_index: element.question.index,
              round_index: element.question.round_id.index, contents: element.answer
            }]);

          });

          console.log(response.data.data);
        }
        else {
          console.log(response.data.message);
        }


        //setSubmittedAnswers(response.data);

      }).catch((error) => {
        console.log(error);
      })
    console.log(submittedAnswers);

  }


  useEffect(() => {

    fetchQuestionsToMark();
  }, [])


  const fetchQuestionsToMark = async () => {
    client.onmessage = async (m: { data: unknown }) => {
      if (typeof m.data === 'string') {
        const dataFromServer = JSON.parse(m.data);
        console.log(
          'on message this is the data from the server',
          dataFromServer
        );

        if (dataFromServer) {
          console.log(dataFromServer.action);
          switch (dataFromServer.action) {
            case "questionsToMark":
              fetchQuestionsToMark();
              break;

          }
        }
      }
    };
    const payload = { pin: room }

    axios.post(livequizhttp + "getRoundCount/", payload)
      .then((response) => {
        if (response.data.status == "success") {

          setRoundsPerQuiz(response.data.rounds);
        }
        else {
          console.log(response.data.message);
        }

      })

    axios.post(livequizhttp + "getQuestionCountPerRound", payload)
      .then((response) => {
        if (response.data.status == "success") {
          // not sure why it wasnt working before i did this
          // Reuben dont touch this or ill chop ur balls off
          setQuestionsPerRound(prevQuestions => [...prevQuestions, ...response.data.data]);
          setQuestionsPerRound(response.data.data);
          //END

        }
        else {
          console.log(response.data.message);
        }
      }).catch((error) => {
        console.log(error);
      });

    /* for testing only */

    await axios.post(livequizhttp + "createQuestionsToMark/", payload)
      .then((response) => {
        if (response.data.status == "success") {
          console.log(response.data);
        }
        else {
          console.log(response.data.message);
        }

      }).catch((error) => {

        console.log(error);
      })
    /* for testing only */

    await getQuestionsToMark();
  };



  // when roundNum is changed
  useEffect(() => {

    //initializes to check QS0 after first render and every time roundNum changes
    setQuestionNum(0);
    const elementQS1 = document.getElementById(
      'QS_0_' + roundNum
    ) as HTMLInputElement | null;
    if (elementQS1) {
      elementQS1.checked = true;
    }

  }, [roundNum]);

  //when questionNum is changed
  useEffect(() => {
    console.log(
      'Fetch new questionTitle and submittedAnswers based on questionNum'
    );
  }, [questionNum]);


  const getNumberOfQuestions = () => {
    let n = 0;
    questionsPerRound.forEach(element => {
      if (element.round_index === roundNum) {
        n = element.question_count
      }
    });
    return n;
  }

  // render round selection elements
  const roundSelection = [];
  for (let i = 0; i < roundsPerQuiz; i++) {
    roundSelection.push(
      <button
        key={i}
        onClick={() => {
          setRoundNum(i);
        }}
      >
        Round {i}
      </button>
    );
  }
  // TODO: MAKEEEE THISSS FUCCCKKIIINGGGG WOOORRRRKKKK
  // remove element from list
  const handleDelete = (element: any) => {
    // IMPORTANT: functional setState update approach to ensure latest submittedAnswers value is used
    setSubmittedAnswers((prevSubmittedAnswers) =>
      prevSubmittedAnswers.filter((answer) => answer !== element)
    );
  };

  // render submitted answer elements
  const submittedAnswerElements = () => {

    return (submittedAnswers &&
      submittedAnswers.map((submittedAnswer) => (
        //submittedAnswer.question_index === questionNum && submittedAnswer.round_index === roundNum
        <SubmittedAnswer
          roundNum={roundNum}
          questionNum={questionNum}
          submittedAnswer={submittedAnswer}
          handleDelete={handleDelete}
          key={submittedAnswer.id}
        ></SubmittedAnswer>)
      )
    );
  }


  const toggleRoundDpdn = () => {
    const roundDpdnMenu = document.getElementById('round-dpdn-menu');
    if (roundDpdnMenu) {
      roundDpdnMenu.classList.toggle('show-menu');
    }
  };

  return (
    <div className='marking-page-div'>
      <Link to="/">
        <BackButton onClick={deleteRoom} />
      </Link>
      <h1 className='branding-heading'>BrewQuest</h1>
      <div className='round-questions'>
        {/* to fetch from database */}
        <div className='round-dpdn'>
          <button onClick={toggleRoundDpdn} className='round-dpdn-btn'>
            Round {roundNum} {'▼'}
          </button>
          <div id='round-dpdn-menu' className='round-dpdn-menu'>
            {roundSelection}
          </div>
        </div>
        <div className='question-selection-container'>
          {/* to fetch from database */}
          {/* display radio buttons */}
          <QuestionButtonsHostMarking
            numberOfQuestions={getNumberOfQuestions()}
            roundNum={roundNum}
            setQuestionNum={setQuestionNum}
          />
        </div>
      </div>
      <h2 className='marked-question'><u><b>Question:</b></u> {questionTitle}</h2>
      <h2 className='marked-question'><u><b>modelAnswer:</b></u> {modelAnswer}</h2>
      {/* arrows to indicate swipe */}
      {/* <div className="arrow-guide left-arrow">&#8592;</div>
            <div className="arrow-guide right-arrow">&#8594;</div> */}
      <div className='submitted-answers-list'>
        {/* answers to be fetched from database */}
        {submittedAnswerElements()}
      </div>
    </div>
  );
};

export default MarkingPage;
