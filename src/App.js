import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Secrete from './components/Secrete'

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Secrete />} />
          <Route exact path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
