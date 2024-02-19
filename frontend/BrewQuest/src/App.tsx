import Landing from './containers/Landing';
import QuizListPage from './containers/QuizListPage';
import MarkingPage from './containers/MarkingPage';
// one css file for all views
import "./index.css";


function App() {
  return(
    <div>
      {/* <Landing />
      <QuizListPage></QuizListPage> */}
      <MarkingPage></MarkingPage>
    </div>
  )
}

export default App;
