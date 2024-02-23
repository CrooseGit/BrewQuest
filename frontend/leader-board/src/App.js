import logo from './logo.svg';
import './App.css';
import { Navbar, Jumbotron, Button, ButtonToolbar} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import ColoredBox from './block';

function App() {
  return (
    <>
      <body>
        <div className="App" >
        <ButtonToolbar>
            <Button bsStyle="success" size="lg" onClick={""}>
              ← Back
            </Button>
          </ButtonToolbar>
    
        </div>
        <p className='leaderboard'>
          Leaderboard
        </p>
        <div>
        <ColoredBox />
        </div>
        <p className='urrank'>
          You are last:(
        </p>
      </body>
    </>
  );
}

export default App;
