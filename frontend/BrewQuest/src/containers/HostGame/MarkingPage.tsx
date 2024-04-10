import { useState } from 'react';
import { useEffect } from 'react';
import SubmittedAnswer from '../../components/SubmittedAnswer/SubmittedAnswer';
import BackButton from '../../components/BackButton/BackButton';
import { Link, useNavigate } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from 'axios';
import QuestionButtonsHostMarking from './QuestionButtonsHostMarking/QuestionButtonsHostMarking';
import NextRoundButton from '../../components/NextRoundButton/NextRoundButton';

import { JSX } from 'react/jsx-runtime';

interface Question {
  question_title: string;
  question_index: number;
  round_index: number;
}
interface ModelAnswer {
  ans: string;
  round_index: number;
  question_index: number;
}
interface RoundMeta {
  round_index: number;
  question_count: number;
}

interface props {
  room: string;
  quizId: number;
  quizTitle: string;
  deleteRoom: () => void;
  client: W3CWebSocket;
  livequizhttp: string;
  startNextRound: () => void;
  roundIndex: number;
}
const MarkingPage = ({
  room,
  quizId,
  quizTitle,
  deleteRoom,
  client,
  livequizhttp,
  startNextRound,
  roundIndex,
}: props) => {
  // Message for backend: look at console to know what to do
  // Initialize roundsPerQuiz, questionsPerRound, questionTitle, submittedAnswers from database
  // current

  const [questionTitles, setQuestionTitles] = useState<Question[]>([]);
  const [modelAnswers, setModelAnswers] = useState<ModelAnswer[]>([]);
  const [questionTitle, setQuestionTitle] = useState('');
  const [modelAnswer, setModelAnswer] = useState('');
  // default to 1
  const [roundNum, setRoundNum] = useState(0);
  const [questionNum, setQuestionNum] = useState(0);

  // for rendering radio elements (FETCH FROM DATABASE)
  const [roundsPerQuiz, setRoundsPerQuiz] = useState(0);
  const [questionsPerRound, setQuestionsPerRound] = useState<RoundMeta[]>([
    { round_index: 0, question_count: 0 },
  ]);

  const navigate = useNavigate();

  //const [questionButtons, setQuestionButtons] = useState<JSX.Element[]>([<></>]);

  const [submittedAnswers, setSubmittedAnswers] = useState<
    {
      button_id: string;
      id: number;
      player_id: number;
      question_index: number;
      round_index: number;
      contents: string;
    }[]
  >([]);
  const [submissionElements, setSubmissionElements] = useState<JSX.Element[]>(
    []
  );
  // answers object
  // IMPORTANT: id for each submitted answer to a question, used for HTML element and key
  // player to identify player, which player submitted the answer (might be in different order than id)
  // should fetch each time questionNum or roundNum variable changes, using useEffect

  // 'QS'+(L/I/null)+'_'+<question index>+'_'+<round index>
  const getQuestionTitleANDModelAnswer = () => {
    axios
      .post(livequizhttp + 'getModelAnswers/', {
        pin: room,
        round_index: roundNum,
        question_index: questionNum,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status == 'success') {
          setQuestionTitle(response.data.data.prompt);
          setModelAnswer(response.data.data.answer);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getQuestionsToMark = async () => {
    const payload = { pin: room };

    axios
      .post(livequizhttp + 'getQuestionsToMark/', payload)
      .then((response) => {
        if (response.data.status == 'success') {
          /* structure of response.data.data records: 

          * Object { id: number, player_id: number, answer: string, 
          * question: Object { index: number, prompt: string", answer: string,
          * round_id: Object { id: number, round_index: number, title: string }}}

          */
          // ps dont ask me y round_id is not just called round this is what the field is in the database

          setSubmittedAnswers([]);

          // submittedAnswers type
          // { id: number, player_id: number, question_index: number, round_index: number, contents: string }[]

          response.data.data.forEach(
            (element: {
              id: number;
              player_id: number;
              answer: string;
              question: {
                index: number;
                prompt: string;
                answer: string;
                round_id: { id: number; index: number; title: string };
              };
            }) => {
              setSubmittedAnswers((prev) => [
                ...prev,
                {
                  button_id:
                    'QS' +
                    '_' +
                    element.question.index +
                    '_' +
                    element.question.round_id.index,
                  id: element.id,
                  player_id: element.player_id,
                  question_index: element.question.index,
                  round_index: element.question.round_id.index,
                  contents: element.answer,
                },
              ]);
              setModelAnswers((prev) => [
                ...prev,
                {
                  ans: element.answer,
                  round_index: element.question.round_id.index,
                  question_index: element.question.index,
                },
              ]);

              setQuestionTitles((prev) => [
                ...prev,
                {
                  question_title: element.question.prompt,
                  question_index: element.question.index,
                  round_index: element.question.round_id.index,
                },
              ]);
            }
          );

          console.log(response.data.data);
        } else {
          console.log(response.data.message);
        }

        //setSubmittedAnswers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(submittedAnswers);
  };

  useEffect(() => {
    fetchQuestionsToMark();
    getQuestionTitleANDModelAnswer();
  }, []);

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
            case 'ClientSubmittedAnswer':
              fetchQuestionsToMark();
              break;
          }
        }
      }
    };
    const payload = { pin: room };

    axios.post(livequizhttp + 'getRoundCount/', payload).then((response) => {
      if (response.data.status == 'success') {
        setRoundsPerQuiz(response.data.rounds);
      } else {
        console.log(response.data.message);
      }
    });

    axios
      .post(livequizhttp + 'getQuestionCountPerRound', payload)
      .then((response) => {
        if (response.data.status == 'success') {
          // not sure why it wasnt working before i did this
          // Reuben dont touch this or ill chop ur balls off
          setQuestionsPerRound((prevQuestions) => [
            ...prevQuestions,
            ...response.data.data,
          ]);
          setQuestionsPerRound(response.data.data);
          //END
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });

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
    questionsPerRound.forEach((element) => {
      if (element.round_index === roundNum) {
        n = element.question_count;
      }
    });
    return n;
  };

  // render round selection elements
  const roundSelection = [];
  for (let i = 0; i < roundsPerQuiz; i++) {
    roundSelection.push(
      <button
        key={i}
        onClick={() => {
          setRoundNum(i);
          getQuestionsToMark();
        }}
      >
        Round {i}
      </button>
    );
  }

  // remove element from list
  const handleDelete = (element: any) => {
    // IMPORTANT: functional setState update approach to ensure latest submittedAnswers value is used
    setSubmittedAnswers((prevSubmittedAnswers) =>
      prevSubmittedAnswers.filter((answer) => answer.id !== element.id)
    );
  };
  useEffect(() => {
    const components: JSX.Element[] = [];
    submittedAnswers.forEach((submittedAnswer) => {
      if (
        submittedAnswer.question_index === questionNum &&
        submittedAnswer.round_index === roundNum
      ) {
        components.push(
          <SubmittedAnswer
            roundNum={roundNum}
            questionNum={questionNum}
            submittedAnswer={submittedAnswer}
            handleDelete={handleDelete}
            key={submittedAnswer.id}
            client={client}
            livequizhttp={livequizhttp}
            room={room}
          ></SubmittedAnswer>
        );
      }
    });
    setSubmissionElements(components);
    getQuestionTitleANDModelAnswer();
  }, [submittedAnswers, roundNum, questionNum]);
  // render submitted answer elements

  const toggleRoundDpdn = () => {
    const roundDpdnMenu = document.getElementById('round-dpdn-menu');
    if (roundDpdnMenu) {
      roundDpdnMenu.classList.toggle('show-menu');
    }
  };

  return (
    <div className='marking-page-div'>
      <div className='w-100'>
        <Link to='/host/QuizList'>
          <BackButton onClick={deleteRoom} />
        </Link>
        <NextRoundButton
          onClick={
            roundIndex == questionsPerRound.length
              ? () => {
                  deleteRoom();
                  navigate('/host/QuizList');
                }
              : startNextRound
          }
          className='btn'
          gameOver={roundIndex == questionsPerRound.length}
        />
      </div>
      <h1 className='branding-heading text'>BrewQuest</h1>
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
      <h2 className='marked-question text'>
        <u>
          <b>Question:</b>
        </u>{' '}
        {questionTitle}
      </h2>
      <h2 className='marked-question text'>
        <u>
          <b>Model Answer:</b>
        </u>{' '}
        {modelAnswer}
      </h2>
      {/* arrows to indicate swipe */}
      {/* <div className="arrow-guide left-arrow">&#8592;</div>
            <div className="arrow-guide right-arrow">&#8594;</div> */}
      <div className='submitted-answers-list'>
        {/* answers to be fetched from database */}
        {submissionElements.map((element) => element)}
      </div>
    </div>
  );
};

export default MarkingPage;
