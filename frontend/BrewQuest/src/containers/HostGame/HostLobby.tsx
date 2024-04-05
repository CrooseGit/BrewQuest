import axios from 'axios';
import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import BackButton from '../../components/BackButton/BackButton';
import '../index.css';

interface Player {
  playername: string;
  score: number;
}
interface props {
  quizId: number;
  room: string;
  quizTitle: string;
  livequizhttp: string;
  client: W3CWebSocket;
  players: Player[];
  updatePlayers: () => void;
  endQuiz: () => void;
  roundIndex: number;
  startQuiz: () => void;
}

const HostLobby = ({
  quizId,
  room,
  quizTitle,
  livequizhttp,
  client,
  players,
  updatePlayers,
  endQuiz,
  roundIndex,
  startQuiz,
}: props) => {
  // Used to remove a player from the lobby
  const kickPlayer = (player: string) => {
    client.send(
      JSON.stringify({
        type: 'HostKicksPlayer',
        data: { room_id: room, playername: player },
      })
    );
    console.log('kickPlayer(): kicking Player' + player);
  };
  // end

  // Defines how to deal with messages on the web socket.
  useEffect(() => {
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
            case 'PlayerJoinedLobby':
            case 'PlayerLeftLobby':
              updatePlayers();
              break;
          }
        }
      }
    };
  }, []);
  // End

  // Used to trigger quiz start for clients
  const tellClientStartQuiz = () => {
    if (roundIndex >= 0) {
      // Stops it from running on start up
      console.log('tellClientStartQuiz():');
      client.send(
        JSON.stringify({
          type: 'HostStartGame',
          data: { room_id: room },
        })
      );
    }
  };
  // End

  // Round index is incremented to signify the start of a new round,
  // that will trigger this function and start the quiz for the clients
  useEffect(() => {
    tellClientStartQuiz();
    // TODO: take host to marking page
  }, [roundIndex]);

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
      <div className='container-fluid'>
        <h1 className='text-light'>Connected to Lobby : {room}</h1>

        <BackButton
          onClick={() => {
            endQuiz();
          }}
          className='btn'
        ></BackButton>

        <button
          onClick={() => {
            // Hand me down function that actually sets round end time then starts round.
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
    </>
  );
};

export default HostLobby;
