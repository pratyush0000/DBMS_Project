import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import DoctorLogin from "./components/DoctorLogin";
import PatientLogin from "./components/PatientLogin";
import PatientSignUp from "./components/PatientSignUp";
import PatientHome from "./components/PatientHome";

function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<PatientLogin/>} />
            <Route path='/patientlogin' element = {<PatientLogin/>}/>
            <Route path='/doctorlogin' element = {<DoctorLogin/>}/>
            <Route path='/patientsignup' element = {<PatientSignUp/>}/>
            <Route path='/patienthome' element = {<PatientHome/>}/>
            <Route path='*' element = {<DoctorLogin/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App