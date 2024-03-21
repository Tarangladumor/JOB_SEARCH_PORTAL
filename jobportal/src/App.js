import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Jobs from './pages/Jobs';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>

        <Route path='/' element={<Home/>}/>

        <Route path='/verify-email' element={<VerifyEmail/>}/>

        <Route path='login' element={<Login/>}/>

        <Route path='signup' element={<Signup/>}/>

        <Route path='/jobs' element={<Jobs/>}/>

      </Routes>
    </div>
  );
}

export default App;
