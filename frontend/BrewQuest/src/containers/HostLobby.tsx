import axios from "axios";
import { useEffect,useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import StartButton from "../components/StartButton/StartButton";

const HostLobby = ({room, quizTitle, quizId}:
    {room:String, quizTitle:String, quizId:number}) => {
    /*
    1) create room to host quiz
    2) create channel
    3) add cancel game feature with deleting room
    4) add start game message sent to all players
    */ 

    const navigate = useNavigate();
    const [players, setPlayers] = useState<{ playername: string, score: number }[]>([]);
    const [connected, setConnected] = useState(false);
    


    
    const livequizhttp = 'http://127.0.0.1:8000/livequiz/';
    let client: W3CWebSocket;
    client = new W3CWebSocket('ws://127.0.0.1:8000/room/' + room + '/');

    const createNewRoom = () => {
        const payload = {"quiz_id": quizId, "room_name": quizTitle,
         pin : quizTitle.replace(/ /g,"_")+"_"+quizId.toString()}
        // JsonResponse({'status', 'message'})
        axios.post(livequizhttp+'createRoom/',payload)
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        })

    }

    function startQuiz() {
        //throw new Error("Function not implemented.");
        if (players.length > 0) {
            client.send(JSON.stringify({
                type: "HostStartGame",
                data: { "room_id": room },
            
            }))
        }
        console.log("starting game");
    }

    const deleteRoom = () => {
        const payload = {"quiz_id": quizId, "room_name": quizTitle,
         pin : quizTitle.replace(/ /g,"_")+"_"+quizId.toString()}
        // JsonResponse({'status', 'message'})
        axios.post(livequizhttp+'deleteRoom/',payload)
        .then((response) => {
            if (response.data.status === "success") {
                client.send(JSON.stringify({
                    type: "LobbyClosedByHost",
                    data: { "room_id": room },
                
                }))

            }
            navigate("/")
            console.log(response.data)
        }).catch((error) => {
            console.error(error);
        });
        
        // JsonResponse({'status', 'message'})
        
    }



    //[client,setClient] = useState(new W3CWebSocket('ws://127.0.0.1:8000/ws/' + room + '/'))
    
    // THIS IS TO BE UNTOUCHED
    const getPlayerStates = () => {
        const payload = { 'pin': room, "nonsense": "nonsense" };

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

    /**
     * Remove a player from the lobby and update the state accordingly.
     */

    // THIS IS TO BE UNTOUCHED
    useEffect(() => {
        console.log(room)
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
    client.onerror = (error) => {
        console.log("Connection Error", error);
    }
    
    /**
     * Initializes the WebSocket client and 
     * sends a message to the server when the connection is opened.
     */
    client.onopen = () => {
        // TODO: used to make room and open websocket
        console.log("WebSocket Client Connected");
        /*
        client.send(JSON.stringify({
            type: "RoomCreated",
        }))
        */ 
        createNewRoom();
        setConnected(true);
    
    }
    
    /**
     * The onclose event handler for the client.
     */
    client.onclose = () => {
        // delete room
        deleteRoom();
        navigate("/");
    }
    }, []);

    
    // TODO: Turn this to delete room routine when tab closed
    useEffect(() => window.addEventListener('beforeunload', async (e) => {

        e.preventDefault()
        e.returnValue = ''

        const payload = {"quiz_id": quizId, "room_name": quizTitle}
        // JsonResponse({'status', 'message'})
        axios.post('http://127.0.0.1:8000/livequiz/'+'deleteRoom/',payload)
        .then((response) => {
            if (response.data.status === "success") {
                client.send(JSON.stringify({
                    type: "LobbyClosedByHost",
                    data: { "room_id": quizTitle.replace(/ /g,"_")+"_"+quizId.toString() },
                
                }))

            }
        }).catch((error) => {
            console.error(error);
        });

        // TODO: delete room code then send message to channel
        // websocket will close when tab is closed
        // so message all clients to close their sockets
    }), [])


// DO NOT TOUCH EXCEPT ADDING CSS
    const makeGrid = (arr: any) => {
        //This code defines a function makeGrid that takes an input array and creates a 
        //grid by grouping the elements of the array in rows of three. The function 
        //returns an array of React component elements representing the grid.
        const grid = [];
        let count = 0;
        console.log("this is player array: ", arr)
        //the input
        // this is the grid formed by having the input array in groups of 3 in a row
        for (let i = 0; i < arr.length; i = i + 3) {
            grid.push(
                <div key={"player row" + (count / 3).toString()} className="row">
                    {arr.slice(i, i + 3).map((n: any, id: number) => <p className="text-center col-md-4 text-light" key={id + count}>{n}</p>)}
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
                        <h1 className="text-light">Connected to Lobby : {room}</h1>
                        
                        
                        <BackButton onClick={() => { navigate("/");
                         // FIXME: Notify all clients that room has closed
                         deleteRoom();
                         }} 
                         className="btn"></BackButton>

                        <StartButton onClick={() => { startQuiz() }} className = "btn"></StartButton>
                        <div className="container">
                            {makeGrid(players.map((n: any) => n.playername))}
                        </div>
                    </div> :

                    <h1>Not Connected</h1>}

        </>
    )
}

export default HostLobby;