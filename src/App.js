import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Main from './pages/main/Main';

function App() {
  return (
      <>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </>
  );
}

export default App;
