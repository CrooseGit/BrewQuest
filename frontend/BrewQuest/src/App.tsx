import './App.css';
import {Routes,Route} from "react-router-dom";

import {GamePin,Landing,Login,Register,Placeholder} from './containers/index';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing></Landing>}></Route>
      <Route path="/gamepin" element={<GamePin/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/placeholder" element={<Placeholder/>}></Route>
    </Routes>

    </>
  );
}

export default App;
