import GameLobby from './GameLobby';
import { useState } from 'react';
import QuestionPageClient from './QuestionPageClient';
import { useLocation } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ip from '../info';
import axios from 'axios';

// ClientGame.tsx
const ClientGame = () => {
  // Page Management + Game State Management
  enum GAME_PAGE {
    Lobby,
    Quiz,
  }
  const [currentPage, setCurrentPage] = useState(GAME_PAGE.Lobby);
  const [quizId, setQuizId] = useState(-1);
  const [roundIndex, setRoundIndex] = useState(0);
  // End

  // Getting Props
  const location = useLocation();
  const room = location.state.room;
  const name = location.state.name;
  // End

  // WebSocket State Management + initializing
  const [connected, setConnected] = useState(false);
  const client = new W3CWebSocket('ws://' + ip + ':8000/room/' + room + '/');
  // End

  // Http address definition
  const livequizhttp = 'http://' + ip + ':8000/livequiz/';
  // End

  // Gets the quiz ID from the server
  const getQuizId = async () => {
    console.log('getQuizId(): ');
    await axios
      .post(livequizhttp + 'getQuizId/', { pin: room, playername: name })
      .then((response) => {
        console.log(response.data);

        if (response.data.status === 'success') {
          setQuizId(response.data.id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // End

  // When each GAME_PAGE is opened,
  // the web sockets onMessage functions are redefined to suit that pages needs

  const Page = () => {
    switch (currentPage) {
      case GAME_PAGE.Lobby:
        return (
          <GameLobby
            client={client}
            connected={connected}
            setConnected={setConnected}
            livequizhttp={livequizhttp}
            triggerGameStart={() => {
              setCurrentPage(GAME_PAGE.Quiz);
            }}
            room={room}
            name={name}
          />
        );
      case GAME_PAGE.Quiz:
        return <QuestionPageClient quizId={quizId} />;
    }
  };

  return <>{Page()}</>;
};

export default ClientGame;
