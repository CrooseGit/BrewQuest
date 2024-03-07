import "./channels.css";
//import { Link } from "react-router-dom";

import { useState, useEffect, } from 'react';

import { w3cwebsocket as W3CWebSocket } from "websocket";


//const socket = io('ws://localhost:8000/ws/mychannel/'); // Replace with your WS URL and port

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
//import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";


function Channel() {




  const [filledForm, setFilledForm] = useState(false);
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [messages, setMessages] = useState<{ msg: string, name: string }[]>([]);
  const [room, setRoom] = useState('test');
  //const [count,setCount] = useState(0);

  const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/' + room + '/');


  useEffect(() => {
    //const client = new WebSocket('your_websocket_url');
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    }
    client.onmessage = (m) => {
      if (typeof (m.data) === 'string') {
        const dataFromServer = JSON.parse(m.data);
        if (dataFromServer) {
          setMessages((prevMessages) => [...prevMessages, { msg: dataFromServer.text, name: dataFromServer.sender }]);
        };
      }
      ///////////////////////////////
      // client.close();
      // ^ actually IMPORTANT as used to close the websocket after connection
      ///////////////////////////////
      // Cleanup function to close the websocket connection
      //return () => client.close();
    }
  }, []);
  const onButtonClicked = (e) => {
    client.send(
      JSON.stringify({
        type: "message",
        text: value,
        sender: name,
      })
    );
    setValue('');
    e.preventDefault();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilledForm(true);
  };

 

  return (
    <Container component="main" maxWidth="xs">
      {filledForm ? (
        <div style={{ marginTop: 50 }}>
          Room Name: {room}
          <Paper
            style={{ height: 500, maxHeight: 500, overflow: "auto", boxShadow: "none", }}
          >
            {messages.map((message,index) => (
             
                <div className="card"  key={index.toString()}>
                  <CardHeader title={message.name} subheader={message.msg} />
                </div>
              
            ))}
          </Paper>
          <form
            className="form"
            noValidate
            onSubmit={onButtonClicked}
          >
            <TextField id="outlined-helperText" label="Write text" defaultValue="Default Value"
              variant="outlined"
              value={value}
              fullWidth
              onChange={(e) => {
                setValue(e.target.value);
                //value = Rvalue

              }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary"
              className="btn btn-primary btn-lg btn-block submit"
            >
              Send Message
            </Button>
          </form>
        </div>
      ) : (
        <div>
          <CssBaseline />
          <div className="paper">
            <form
              className="form"
              noValidate
              onSubmit={handleSubmit}
            >
              <TextField variant="outlined" margin="normal" required fullWidth label="Room name"
                name="Room name"
                autoFocus
                value={room}
                onChange={(e) => {
                  setRoom(e.target.value);
                 

                }}
              />
              <TextField variant="outlined" margin="normal" required fullWidth name="sender" label="sender"
                type="sender"
                id="sender"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                 
                }}
              />
              <Button type="submit" fullWidth variant="contained" color="primary"
                className="btn bg-body-secondary"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Channel;