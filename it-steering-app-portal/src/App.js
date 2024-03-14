import logo from './logo.svg';
import './App.css';

// Pages
import Login from './pages/Login';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';

// Components
import Header from './components/Header';

function App() {
  return (
    // <Login/>
    <>
      <Header />
      <Projects />
    </>
    // <CreateProject />  

  );
}

export default App;
