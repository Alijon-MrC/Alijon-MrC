import { Route, Routes } from 'react-router-dom';
import './App.css';
import Facultets from './pages/Facultets';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/facultets' element={<Facultets />} />
    </Routes>
  );
}

export default App;
