import BackButton from '../components/BackButton/BackButton';
import {Link, useNavigate} from "react-router-dom";
import '../index.css';

import { useState, useEffect, } from 'react';
import axios from 'axios';


// TODO: Add feature to check whether entered name is a unique playername in the gamelobby
// then only allow the player to join the lobby and join the game if the name is unqiue
// allow for 

/**
 * Generates the GamePin component which allows a user to enter a game pin and username to join a game.
 *
 * @param {string} room - The game room pin
 * @param {string} name - The player's username
 * @param {React.Dispatch<React.SetStateAction<string>>} setRoom - A function to set the game room
 * @param {React.Dispatch<React.SetStateAction<string>>} setName - A function to set the player's username
 * @return {JSX.Element} The GamePin component UI
 */
const GamePin = ({room, name, setRoom, setName}:
  {room:string, name:string, 
    setRoom:React.Dispatch<React.SetStateAction<string>>, 
    setName:React.Dispatch<React.SetStateAction<string>>}) => {

  const navigate = useNavigate();
  const [gameFound, setGameFound] = useState(false);
 

  /**
   * Handles the click event of the back button.
   * Routes user to the landing page.
   * @return {void} This function does not return a value.
   */
  const handleBackButtonClick = () => {
    // Replace this with actual functionality when other view exists
    console.log('Going Back');
    navigate('/');
  };


  /**
   * Handles the form submission event.
   * checks if a valid game pin and username have been entered
   * then tries to connect user to the game by outing them to the game lobby
   * @param {any} e - The event object.
   * @return {void} This function does not return anything.
   */
  const handleSubmit = (e:any) => {
    e.preventDefault();
    // TODO: Add feature to check whether entered name is a unique playername in the gamelobby
    // TODO: then only allow the player to join the lobby and join the game if the name is unqiue
    if (name !== '' && room !== '') {

      axios
      .post('http://localhost:8000/livequiz/joinGame/',{'pin':room,'playername':name})
      .then((response:any) =>{
        if (response.data.status === "success") {
          console.log(response.data.players)
          navigate(`/host/lobby`)
          }else {
          console.error("error, game not found");
          alert("error, game not found");
      }
        setGameFound(true)
      }).catch((error)=>
      {console.log("error")})  
  };
  }
  /**
   * Set the name based on the provided parameter.
   *
   * @param {any} e - the input event
   * @return {void} 
   */
  const nameSet = (e:any) => {
    setName(e.target.value);
    
  }
  /**
   * A function that sets the room value based on the input event.
   *
   * @param {any} e - the input event
   * @return {void} 
   */
  const roomSet = (e:any) => {
    setRoom(e.target.value);
    
  }


  return (
    <>
    
      <Link to="../">
        <BackButton onClick={handleBackButtonClick} className='text' /></Link>
      <div>
        <h1 className='text display-1'>Game Pin</h1>
      </div>
      <div className='container gamepin'>
        <form>
          <div className='mb-3'>
            
            <input  className='form-control' placeholder="Insert game pin here" id='input-txtbox'
            onChange={roomSet} />
          </div>
          <div className='mb-3'>
            
            <input  className='form-control' placeholder="enter username" id='input-txtbox'
            onChange={nameSet}/>
          </div>

          <div className='d-grid gap-2 col-6 mx-auto'>
            
            <button
              type='button'
              className='btn btn-primary btn-lg'
              id='confirm-btn'
              onClick={handleSubmit}
              >
              Confirm
            </button>
          </div>
        </form>
      </div>
      
    </>
  );
};
export default GamePin;
