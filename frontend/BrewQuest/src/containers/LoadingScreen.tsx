import beeru from '../assets/beeru.gif';



// import OptionButton from './OptionButton.tsx';


const LoadingScreen = () => {
    // set up items list structure
    // sample quiz array

    return (
        <div>
            <h1 className='text'>Marking your answers...</h1>
            <img className='beer-img' src={beeru} />
        </div>
    );
            }
export default LoadingScreen;
