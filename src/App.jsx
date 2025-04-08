import './App.css'
import { useNavigate } from 'react-router'
import { Link } from 'react-router';
function App() {
  const navigate = useNavigate();


  return (
    <div className='app-container'>
      <div className='card-container-intro'>
      <h2> Bienvenidos al super mini </h2>
      <Link to="/store">
      <button
      >
        Empezara  a comprar 
      </button>
      </Link>
      
      </div>
    </div>
  )
}

export default App
