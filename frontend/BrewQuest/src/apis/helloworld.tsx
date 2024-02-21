import { useState, useEffect } from 'react';
import axios from 'axios';

function HelloWorld() {
  const [message, setMessage] = useState('');
//http://127.0.0.1:8000/QuizEditsAPI/hello-world/
//http://localhost:8000/hello-world/
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/QuizEditsAPI/hello-world/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>{message}</p>
    </div>
  );
}

export default HelloWorld;