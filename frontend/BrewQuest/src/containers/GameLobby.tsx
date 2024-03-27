import "./index.css";
//import { Link } from "react-router-dom";

import { useState, useEffect } from 'react';
import BackButton from "../components/BackButton/BackButton";
import { Link } from "react-router-dom";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Landing } from ".";

// TODO: Add feature


const GameLobby = ({ room, name, setRoom, setName }:
  {
    room: string, name: string,
    setRoom: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>
  }) => {

  const navigate = useNavigate();
  const [players, setPlayers] = useState<{ playername: string, score: number }[]>([]);
  const [connected, setConnected] = useState(false);

  const handleStartClicked = () => {
        //should start the quiz(go to the marking page)
  };


  let client: W3CWebSocket;
  const livequizhttp = 'http://127.0.0.1:8000/livequiz/';



  //[client,setClient] = useState(new W3CWebSocket('ws://127.0.0.1:8000/ws/' + room + '/'))
  client = new W3CWebSocket('ws://127.0.0.1:8000/room/' + room + '/');

  const getPlayerStates = () => {
    const payload = { 'pin': room, 'playername': name };

    axios
      .post(livequizhttp + "getLobbyPlayerStates/", payload)
      .then((response) => {
        console.log(" this is the response: ", response);
        if (response.data.status === "success") {

          setPlayers(response.data.playerScores);

        }
        else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const removePlayer = async () => {
    console.log("WebSocket Client Closed");
    await axios
      .post(livequizhttp + "playerLeftLobby/", { 'pin': room, 'playername': name }).
      then((response) => {

        console.log(response.data);

        if (response.data.status === "success") {

          setConnected(false);
        }

        // synchrounous function btw
        client.send(JSON.stringify({
          type: "PlayerLeftLobby",
          data: { "room_id": room, "playername": name },
        }));


      }).catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    /**
 * Handles the incoming message from the client.
 *
 * @param {any} m - The message received from the client. (not sure of specific type)
 */
    client.onmessage = async (m: any) => {


      if (typeof (m.data) === 'string') {
        const dataFromServer = JSON.parse(m.data);
        console.log("on message this is the data from the server", dataFromServer)

        if (dataFromServer) {

          switch (dataFromServer.action) {
            case "PlayerJoinedLobby":
              {
                console.log("PlayerJoinedLobby");
                getPlayerStates();
                //axios.get('http://127.0.0.1:8000/room/' + room + '/')
                break;
              }
            case "PlayerLeftLobby":
              {
                console.log("PlayerLeftLobby");
                getPlayerStates();
                break;
              }
          }

        };
      }
    }


    /**
     * Handles the error event for the client.
     *
     * @param {error} error - the error object
     */
    client.onerror = (error) => {
      console.log("Connection Error", error);
    }

    /**
     * Initializes the WebSocket client and 
     * sends a message to the server when the connection is opened.
     */
    client.onopen = () => {

      console.log("WebSocket Client Connected");

      client.send(  // synchrounous function btw
        JSON.stringify({
          type: "PlayerJoinedLobby",
          data: { "room_id": room, "playername": name },
        })
      );
      setConnected(true);

    }

    /**
     * The onclose event handler for the client.
     */
    client.onclose = () => {
      removePlayer();
    }
  }, []);

  useEffect(() => window.addEventListener('beforeunload', async (e) => {

    e.preventDefault()
    e.returnValue = ''

    await axios
      .post(livequizhttp + "playerLeftLobby/", { 'pin': room, 'playername': name }).
      then((response) => {

        console.log(response.data);

        if (response.data.status === "success") {

          setConnected(false);
        }

        // synchrounous function btw
        client.send(JSON.stringify({
          type: "PlayerLeftLobby",
          data: { "room_id": room, "playername": name },
        }));


      }).catch((error) => {
        console.log(error);
      })
  }), [])

  // client.close();
  // ^ actually IMPORTANT as used to close the websocket after connection
  // use return () => {client.close() } in useEffect to close it

  /**
   * Creates a grid based on the input array.
   *
   * @param  arr - the input array
   * @return {ReactComponentElement[]} the grid created from the input array
   */
  const makeGrid = (arr: any) => {
    //This code defines a function makeGrid that takes an input array and creates a 
    //grid by grouping the elements of the array in rows of three. The function 
    //returns an array of React component elements representing the grid.
    const grid = [];
    let count = 0;

    //the input
    // this is the grid formed by having the input array in groups of 3 in a row
    for (let i = 0; i < arr.length; i = i + 3) {
      grid.push(
        <div key={"player row" + (count / 3).toString()} className="row">
          {arr.slice(i, i + 3).map((n: any, id: number) => <p className="text-center col-md-4 " key={id + count}>{n}</p>)}
        </div>
      )
      count = count + 3
    }
    return grid
  }

  return (
    <>
    { // If connected, render the lobby, otherwise render a message
      connected ?


          <div className="container-fluid">
            <BackButton onClick={() => { navigate("/"); removePlayer() }} className="btn"></BackButton>
            <h1 className="text">BrewQuest</h1>
            <h2 className="text center-text">Connected to Lobby : {room}</h2>
            <h2 className="text center-text">Player Count: {players.length}</h2>
            <div className='scrollMenu'>
                {players.map((n: any) => (
                  <label className="user">
              <h4 className="text">{n.playername}</h4>
                </label>
            ))}
            </div>
            <div className='d-flex justify-content-center'>
                <button
                type='button'
                className='btn btn-lg startButton'
                onClick={() => handleStartClicked()}>
                <h2 className='text'>Start</h2>
                </button>
            </div> 
          </div>:
          <div className="container-fluid">
        <BackButton onClick={() => { navigate("/"); removePlayer() }} className="btn"></BackButton>
          <h1 className="text">Not Connected</h1>
          </div>}

    </>

    
  );
}

export default GameLobby;
