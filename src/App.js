
import './App.css';
import Home from './screens/Home';
import Navbar from './components/Navbar';
import Profile from './screens/Profile';
import Create from './screens/Create';
import Login from './screens/Login';
import Signup from './screens/Signup';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    
   
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/create' element={<Create/>} />
      <Route path='/profile' element={<Profile/>} />


     


      </Routes>
      
      
    </BrowserRouter>
   
  );
}

export default App;
