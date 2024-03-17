// Libraries
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// CSS
import './App.css'

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';

// Components
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/createproject' element={<CreateProject/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
