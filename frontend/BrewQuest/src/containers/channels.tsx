//import { Link } from "react-router-dom";

import { useState, useEffect } from 'react';
import ip from '../info';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

//const socket = io('ws://'+ip+':8000/ws/mychannel/'); // Replace with your WS URL and port

function Channel() {
  const [filledForm, setFilledForm] = useState(false);
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [messages, setMessages] = useState<{ msg: string; name: string }[]>([]);
  const [room, setRoom] = useState('test');
  //const [count,setCount] = useState(0);

  const client: W3CWebSocket = new W3CWebSocket(
    'ws://' + ip + ':8000/ws/' + room + '/'
  );

  useEffect(() => {
    //const client = new WebSocket('your_websocket_url');
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (m) => {
      if (typeof m.data === 'string') {
        const dataFromServer = JSON.parse(m.data);
        if (dataFromServer) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { msg: dataFromServer.text, name: dataFromServer.sender },
          ]);
        }
      }
      ///////////////////////////////
      // client.close();
      // ^ actually IMPORTANT as used to close the websocket after connection
      ///////////////////////////////
      // Cleanup function to close the websocket connection
      //return () => client.close();
    };
  }, []);
  const onButtonClicked = (e) => {
    client.send(
      JSON.stringify({
        type: 'message',
        text: value,
        sender: name,
      })
    );
    setValue('');
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilledForm(true);
  };

  return (
    <div className='container'>
      {filledForm ? (
        <div style={{ marginTop: 50 }}>
          Room Name: {room}
          <div
            className='paper'
            style={{
              height: 500,
              maxHeight: 500,
              overflow: 'auto',
              boxShadow: 'none',
            }}
          >
            {messages.map((message, index) => (
              <div className='card' key={index.toString()}>
                <p className='card-text' title={message.name} />
                <p className='card-text' title={message.msg} />
              </div>
            ))}
          </div>
          <form className='form' noValidate onSubmit={onButtonClicked}>
            <input
              type='text'
              id='outlined-helperText'
              defaultValue='Default Value'
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                //value = Rvalue
              }}
            />
            <button
              type='submit'
              className='btn btn-primary btn-lg btn-block submit'
            >
              Send Message
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className='paper'>
            <form className='form' noValidate onSubmit={handleSubmit}>
              <input
                type='text'
                name='Room name'
                autoFocus
                value={room}
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
              <input
                className='form-control'
                name='sender'
                type='text'
                id='sender'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button type='submit' className='btn bg-body-secondary'>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Channel;
