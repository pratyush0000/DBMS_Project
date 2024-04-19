import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PatientHome.module.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


const PatientHome = () => {
  const location = useLocation();
  const patientId = location.state ? location.state.patientId : null; // Check if location.state is defined

  const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

const [isModalOpen1, setIsModalOpen1] = useState(false);
const [isModalOpen2, setIsModalOpen2] = useState(false);

  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

const[departments, setDepartments] = useState([]);
const [selectedDepartment, setSelectedDepartment] = useState('');
const[doctorsobject,setdoctorsobject]=useState([]);
const[doctors, setDoctors] = useState([]);
const[selecteddoctor, setSelectedDoctor] = useState(''); 

//function get departments from 
const getDepartments = async (e) => {
    e.preventDefault();
    const response = await instance.get('/api/departments');
    console.log(response);
    setDepartments(response.data);
    return response.data;
}

const [doctorIds, setDoctorIds] = useState({});

const getdoctorsofdepartment = async (e) => {
e.preventDefault();
const response = await instance.get('/api/departments/docs', {
    params: {
        department: selectedDepartment
    }
});
console.log(response);
setdoctorsobject(response.data);
const doctorNames = response.data.map(doctor => doctor.name);
const doctorIds = response.data.reduce((acc, doctor) => {
    acc[doctor.name] = doctor.id;
    return acc;
}, {});
setDoctors(doctorNames);
setDoctorIds(doctorIds);
return doctorNames;
}

const book = async (e) => {
    e.preventDefault();
    const symptoms = document.getElementById('symptoms').value;
    const doctorId = doctorIds[selecteddoctor]; // Get the ID of the selected doctor
    
    const response = await instance.post('/api/appointment', {
        symptoms: symptoms,
        doctor: doctorId, // Send the doctor ID
        patient: patientId,
        status: false
    });
    console.log(response);
}
return (
     <div>
      <button onClick={openModal1}>Book Appointment</button>

      {isModalOpen1 && (
        <div className="modal">
          <button onClick={closeModal1}>Close</button>
          <div>
            <h1>Book Appointments</h1>
            <form>
              <label>Enter Symptoms</label>
              <textarea id="symptoms" name="symptoms" rows="4" cols="50"></textarea>
              <br />
              <button onClick={getDepartments}>Choose department</button>
              <select id="departments" name="departments" onChange={(e) => setSelectedDepartment(e.target.value)}>
                {departments.map((department, index) => {
                  return <option key={index} value={department}>{department}</option>
                })}
              </select>
              <button onClick={getdoctorsofdepartment}>Get Doctors of department</button>
              <select id="doctors" name="doctors" onChange={(e)=>setSelectedDoctor(e.target.value)}>
                {doctors.map((doctor, index) => {
                  return <option key={index} value={doctor}>{doctor}</option>
                })}
              </select>
              <button onClick={book}>Book Appointment</button>
            </form>
          </div>
        </div>
      )}

      
    </div>
)
}
export default PatientHome;