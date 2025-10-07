import './App.sass';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import {useEffect} from 'react'

function App() {

  useEffect(() => {
    document.title = 'Mercado libre';
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
