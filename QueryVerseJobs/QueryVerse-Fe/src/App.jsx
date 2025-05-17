import Navbar from "./components/Navbar/Navbar"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Index from "./components/Pages/Index/Index";
import Joblist from "./components/Pages/Job lists/JobList"
import Post from "./components/Pages/Dashboard/Post";
import Footer from "./components/Footer/Footer";
import Apply from "./components/Pages/Apply/Apply";
import JobDetail from "./components/Pages/JobDetail/JobDetail";
import JobList from "./components/Pages/Job lists/JobList";
import EmployerDashBoard from "./components/Pages/Dashboard/EmployerDashBoard";
import CandidateDashBoard from "./components/Pages/Dashboard/CandidateDashboard/CandidateDashBoard";
import EmpCan from "./components/Pages/Employer-Candidate/EmpCan";
import Employer from "./components/Pages/Signin/Employer.jsx";
import Candidate from "./components/Pages/Signin/Candidate.jsx";
import CandidateSignup from "./components/Pages/Signup/CandidateSignup.jsx";
import EmployerSignup from "./components/Pages/Signup/EmployerSignup.jsx";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <div className="dark:bg-[#0F1117]">
    <Navbar />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/jobs' element={<Joblist />} />
        <Route path='/JobDetail/:jobID' element={<JobDetail />} />
        <Route path='/JobList' element={<JobList />} />
        <Route path='/employer/Dashboard' element={<EmployerDashBoard />} />
        <Route path='/employer/Dashboard/Profile' element={<EmployerDashBoard />} />
        <Route path='/candidate/Dashboard' element={<CandidateDashBoard />} />
        <Route path='/candidate/Dashboard/Profile' element={<CandidateDashBoard />} />
        <Route path='/PostaJob' element={<EmployerDashBoard />} />
        <Route path='/Apply/:jobID' element={<Apply />} />
        <Route path='/Signin' element={<EmpCan />} />
        <Route path='/signin/candidate' element={<Candidate />} />
        <Route path='/signin/employer' element={<Employer />} />
        <Route path='/signup/candidate' element={<CandidateSignup />} />
        <Route path='/signup/employer' element={<EmployerSignup />} />

      </Routes>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Footer />
    </div>
      
    </>
  )
}

export default App
