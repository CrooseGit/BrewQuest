import GameLobby from './GameLobby';
import { useState } from 'react';
import QuestionPageClient from './QuestionPageClient';
import { useLocation } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ip from '../info';

// ClientGame.tsx
const ClientGame = () => {
  // Page Management
  enum GAME_PAGE {
    Lobby,
    Quiz,
  }
  const [currentPage, setCurrentPage] = useState(GAME_PAGE.Lobby);
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
        return <QuestionPageClient />;
    }
  };

  return <>{Page()}</>;
};

export default ClientGame;
