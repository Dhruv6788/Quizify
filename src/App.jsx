import './App.css'
import Home from './module/base/Home'
import LoginForm from './module/auth/LoginForm'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from './module/auth/SignUp';
import Activate from './module/auth/Activate';
import Forgot from './module/auth/Forgot';
import ResetPassword from './module/auth/ResetPassword';
import Dashboard from './module/dashboard/Dashboard';
import SubjectDetail from './module/dashboard/SubjectDetail';
import Students from './module/dashboard/Students';
import AddSubject from './module/dashboard/AddSubject'
import EditSubject from './module/dashboard/EditSubject';
import QuizDetails from './module/quiz/QuizDetails';
import AddQuiz from './module/quiz/AddQuiz';
import Profile from './module/profile/Profile';

function App() {
  return (
    <>
      <div className='font-[g-medium]'>
        <Router>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/activate/:uid/:token' element={<Activate />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/password-reset/:uid/:token' element={<ResetPassword />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/newsubject' element={<AddSubject />} />
            <Route path='/:subject_code' element={<SubjectDetail />} />
            <Route path='/:subject_code/students' element={<Students />} />
            <Route path='/:subject_code/results' element={<SubjectDetail />} />
            <Route path='/:subject_code/edit' element={<EditSubject />} />
            <Route path='/:subject_code/quizdetail' element={<QuizDetails />} />
            <Route path='/:subject_code/newquiz' element={<AddQuiz />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App