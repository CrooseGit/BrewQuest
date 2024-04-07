
//import {Button, ButtonToolbar} from 'react-bootstrap';

import ColoredBox from '../components/LeaderboardParts/block';


function Leaderboard() {
    const logoPath = '../components/LeaderboardParts/logo.svg'
  return (
    <>
      <body className='body'>
        <div className="App" >
        <div className='scrollMenu'>
            <button className="btn btn-success btn-lg"  >
              ← Back
            </button>
          </div>
    
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

export default Leaderboard;