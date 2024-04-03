import axios from 'axios';
import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton/BackButton';
import ip from '../info';
import './index.css';

interface Player {
  playername: string;
  score: number;
}

const HostLobby = () => {
  /*
    1) create room to host quiz
    2) create channel
    3) add cancel game feature with deleting room
    4) add start game message sent to all players
    */

  // The next 4 lines gets all the props, has to be done this way because of react routing
  const location = useLocation();
  const quizId = location.state.id;
  const room = location.state.room;
  const quizTitle = location.state.title;
  // -----------------------------------

  const navigate = useNavigate();

  // Stores an array of player objects representing players in attendance
  const [players, setPlayers] = useState<Player[]>([]);

  const [connected, setConnected] = useState(false);

  // Address used for making http requests to the backend
  const livequizhttp = 'http://' + ip + ':8000/livequiz/';

  // Initializing websocket
  const client = new W3CWebSocket('ws://' + ip + ':8000/room/' + room + '/');

  const createNewRoom = () => {
    const payload = {
      quiz_id: quizId,
      room_name: quizTitle,
      pin: quizTitle.replace(/ /g, '_') + '_' + quizId.toString(),
    };
    // JsonResponse({'status', 'message'})
    axios
      .post(livequizhttp + 'createRoom/', payload)
      .then((response) => {
        console.log('createNewRoom response: ');
        console.log(response);
      })
      .catch((error) => {
        console.error('Error: ' + error);
      });
  };

  function startQuiz() {
    if (players.length > 0) {
      client.send(
        JSON.stringify({
          type: 'HostStartGame',
          data: { room_id: room },
        })
      );
      console.log('startQuiz(): Starting quiz');
    }
  }

  const kickPlayer = (player: string) => {
    client.send(
      JSON.stringify({
        type: 'HostKicksPlayer',
        data: { room_id: room, playername: player },
      })
    );
    console.log('kickPlayer(): kicking Player' + player);
  };

  const deleteRoom = () => {
    const payload = {
      quiz_id: quizId,
      room_name: quizTitle,
      pin: quizTitle.replace(/ /g, '_') + '_' + quizId.toString(),
    };
    // JsonResponse({'status', 'message'})
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

  // THIS IS TO BE UNTOUCHED
  const getPlayerStates = () => {
    const payload = { pin: room, nonsense: 'nonsense' };

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

  /**
   * Remove a player from the lobby and update the state accordingly.
   */

  // THIS IS TO BE UNTOUCHED
  useEffect(() => {
    console.log(room);
    /**
     * Handles the incoming message from the client.
     *
     * @param {any} m - The message received from the client. (not sure of specific type)
     */
    client.onmessage = async (m: { data: unknown }) => {
      if (typeof m.data === 'string') {
        const dataFromServer = JSON.parse(m.data);
        console.log(
          'on message this is the data from the server',
          dataFromServer
        );

        if (dataFromServer) {
          switch (dataFromServer.action) {
            case 'PlayerJoinedLobby': {
              console.log('PlayerJoinedLobby');
              getPlayerStates();
              break;
            }
            case 'PlayerLeftLobby': {
              console.log('PlayerLeftLobby');
              getPlayerStates();
              break;
            }
          }
        }
      }
    };
    client.onerror = (error) => {
      console.log('Connection Error', error);
    };

    /**
     * Initializes the WebSocket client and
     * sends a message to the server when the connection is opened.
     */
    client.onopen = () => {
      // TODO: used to make room and open websocket
      console.log('WebSocket Client Connected');
      /*
        client.send(JSON.stringify({
            type: "RoomCreated",
        }))
        */
      createNewRoom();
      setConnected(true);
    };

    /**
     * The onclose event handler for the client.
     */
    client.onclose = () => {
      // delete room
      deleteRoom();
      navigate('/host/QuizList');
    };
  }, []);

  // TODO: Turn this to delete room routine when tab closed
  useEffect(
    () =>
      window.addEventListener('beforeunload', async (e) => {
        e.preventDefault();
        e.returnValue = '';

        const payload = { quiz_id: quizId, room_name: quizTitle };
        // JsonResponse({'status', 'message'})
        axios
          .post('http://' + ip + ':8000/livequiz/' + 'deleteRoom/', payload)
          .then((response) => {
            if (response.data.status === 'success') {
              client.send(
                JSON.stringify({
                  type: 'LobbyClosedByHost',
                  data: {
                    room_id:
                      quizTitle.replace(/ /g, '_') + '_' + quizId.toString(),
                  },
                })
              );
            }
          })
          .catch((error) => {
            console.error(error);
          });

        // TODO: delete room code then send message to channel
        // websocket will close when tab is closed
        // so message all clients to close their sockets
      }),
    []
  );

  // DO NOT TOUCH EXCEPT ADDING CSS
  const makeGrid = (playernames: string[]) => {
    //This code defines a function makeGrid that takes an input array and creates a
    //grid by grouping the elements of the array in rows of three. The function
    //returns an array of React component elements representing the grid.
    const grid = [];
    let count = 0;
    console.log('this is player array: ', playernames);
    //the input
    // this is the grid formed by having the input array in groups of 3 in a row
    for (let i = 0; i < playernames.length; i = i + 3) {
      grid.push(
        <div key={'player row' + (count / 3).toString()} className='row'>
          {playernames.slice(i, i + 3).map((name: string, id: number) => (
            <div
              className='text-center col-md-4 text-light player-div'
              key={id + count}
              onClick={() => {
                kickPlayer(name);
              }}
            >
              <h4>{name}</h4>
            </div>
          ))}
        </div>
      );
      count = count + 3;
    }
    return grid;
  };

  return (
    <>
      {
        // If connected, render the lobby, otherwise render a message
        connected ? (
          <div className='container-fluid'>
            <h1 className='text-light'>Connected to Lobby : {room}</h1>

            <BackButton
              onClick={() => {
                deleteRoom();
                navigate('/host/QuizList');
                // FIXME: Notify all clients that room has closed
              }}
              className='btn'
            ></BackButton>

            <button
              onClick={() => {
                startQuiz();
              }}
              disabled={players.length == 0}
              className='button btn btn-primary btn-lg '
              type='button'
            >
              Start
            </button>
            <div className='container'>
              {makeGrid(players.map((n: Player) => n.playername))}
            </div>
          </div>
        ) : (
          <h1>Not Connected</h1>
        )
      }
    </>
  );
};

export default HostLobby;
