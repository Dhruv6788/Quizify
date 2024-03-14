import './App.css'
import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from './pages/SignUp';
import Activate from './pages/Activate';
import Forgot from './pages/Forgot';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/activate/:uid/:token' element={<Activate />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/password-reset/:uid/:token' element={<ResetPassword />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/dashboard' element={<Dashboard/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
