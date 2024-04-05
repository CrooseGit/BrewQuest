import { useEffect, useState } from 'react';
import HostLobby from './HostLobby';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ip from '../../info';

interface Player {
  playername: string;
  score: number;
}

const HostGame = () => {
  // Page Management + Game State Management
  enum HOST_PAGE {
    CreatingRoom,
    Lobby,
    Quiz,
    LeaderBoard,
  }
  const [gameOver, setGameOver] = useState(false);
  const [currentPage, setCurrentPage] = useState(HOST_PAGE.CreatingRoom);
  const [roundIds, setRoundIds] = useState([]);
  const [roundIndex, setRoundIndex] = useState(-1);
  const [connected, setConnected] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [errorMessage, setErrorMessage] = useState('Creating Room');
  // End

  // The next 4 lines gets all the props, has to be done this way because of react routing
  const location = useLocation();
  const quizId = location.state.id;
  const room = location.state.room;
  const quizTitle = location.state.title;
  // -----------------------------------

  // For routing programmatically
  const navigate = useNavigate();
  // End

  // Address used for making http requests to the backend
  const livequizhttp = 'http://' + ip + ':8000/livequiz/';
  // End

  // Initializing websocket
  const client = new W3CWebSocket('ws://' + ip + ':8000/room/' + room + '/');
  // End

  // Creates a room, the backend will delete any existing rooms by the same name.
  const createNewRoom = () => {
    const payload = {
      quiz_id: quizId,
      room_name: quizTitle,
      pin: quizTitle.replace(/ /g, '_') + '_' + quizId.toString(),
    };

    axios
      .post(livequizhttp + 'createRoom/', payload)
      .then((response) => {
        console.log('createNewRoom response: ');
        console.log(response);
        if (response.data.status == 'failed')
          setErrorMessage(
            'Room creation failed, please refresh your browser to try again.'
          );
        else {
          setErrorMessage('SUCCESS');
          setCurrentPage(HOST_PAGE.Lobby);
        }
      })
      .catch((error) => {
        console.error('Error: ' + error);
      });
  };
  // End

  // Deletes the room. To be used on game close, or suchlike
  const deleteRoom = () => {
    const payload = {
      quiz_id: quizId,
      room_name: quizTitle,
      pin: quizTitle.replace(/ /g, '_') + '_' + quizId.toString(),
    };

    axios
      .post(livequizhttp + 'deleteRoom/', payload)
      .then((response) => {
        if (response.data.status === 'success') {
          client.send(
            JSON.stringify({
              type: 'LobbyClosedByHost',
              data: { room_id: room },
            })
          );
        }

        console.log('deleteRoom() response: ');
        console.log(response.data);
      })
      .catch((error) => {
        console.error('error: ' + error);
      });
  };
  // End

  // Actions to be completed on page initialization
  // Creates Room
  useEffect(() => {
    createNewRoom();
  }, []);

  // Sets actions to be completed on websocket creation, closure and error
  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.send(
        JSON.stringify({
          type: 'HostJoinedLobby',
          data: { room_id: room },
        })
      );
      setConnected(true);
    };
    client.onclose = () => {
      // delete room
      deleteRoom();
      navigate('/host/QuizList');
    };
    client.onerror = (error) => {
      console.log('Connection Error', error);
    };
  }, []);
  // End

  // Deletes room when tab closed
  useEffect(
    () =>
      window.addEventListener('beforeunload', async (e) => {
        e.preventDefault();
        e.returnValue = '';
        deleteRoom();
      }),
    []
  );
  // End

  // Gets a list of all the players and their scores
  const getPlayerStates = () => {
    const payload = { pin: room };

    axios
      .post(livequizhttp + 'getLobbyPlayerStates/', payload)
      .then((response) => {
        console.log(' getPlayerStates response: ');
        console.log(response);
        if (response.data.status === 'success') {
          setPlayers(response.data.playerScores);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // End

  // Used to set round end time, will trigger new round
  const updateRoundData = () => {
    console.log('updateRoundData(): ');
    const payload = {
      pin: quizTitle.replace(/ /g, '_') + '_' + quizId.toString(),
      roundIndex: roundIndex + 1,
    };
    axios
      .post(livequizhttp + 'updateRoundData/', payload)
      .then((response) => {
        console.log(response);
        if (players.length > 0) {
          setRoundIndex(roundIndex + 1);
          // Used to trigger function to start round only once data is up to date.
        }
      })
      .catch((error) => {
        console.error('Error: ' + error);
      });
  };
  // End

  // Sets page depending on game state.
  const Page = () => {
    switch (currentPage) {
      case HOST_PAGE.CreatingRoom:
        return (
          <>
            <h1 className='text display-1'>{errorMessage}</h1>
          </>
        );
      case HOST_PAGE.Lobby:
        return (
          <HostLobby
            quizId={quizId}
            room={room}
            quizTitle={quizTitle}
            livequizhttp={livequizhttp}
            client={client}
            players={players}
            updatePlayers={getPlayerStates}
            endQuiz={() => {
              deleteRoom();
              navigate('/host/QuizList');
            }}
            roundIndex={roundIndex}
            startQuiz={() => {
              updateRoundData();
            }}
          />
        );
    }
  };

  return <>{Page()}</>;
};

export default HostGame;
