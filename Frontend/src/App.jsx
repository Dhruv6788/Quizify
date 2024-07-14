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
import EditQuiz from './module/quiz/EditQuiz'
import Profile from './module/profile/Profile';
import Quiz from './module/quiz/Quiz'
import StartQuiz from './module/quiz/StartQuiz';
import Homepage from './module/base/Homepage';
import Result  from '../src/module/quiz/Result';

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/home' element={<Homepage />} />
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
            <Route path='/:subject_code/:quiz_slug' element={<Quiz />} />
            <Route path='/:subject_code/:quiz_slug/edit' element={<EditQuiz />} />
            <Route path='/:subject_code/:quiz_slug/startquiz' element={<StartQuiz />} />
            <Route path='/:subject_code/:quiz_slug/result' element={<Result />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App