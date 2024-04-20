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

    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [doctorsobject, setdoctorsobject] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selecteddoctor, setSelectedDoctor] = useState('');
    const [Patientid, setPatientId] = useState(null);

    // Function to get departments
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
            patient: Patientid,
            status: false
        });
        console.log(response);
    }

    return (
        <>
            <div className={styles.fullpage}>
                <div className={styles.fulldiv}>
                    <button onClick={openModal1}>Book Appointment</button>

                    {isModalOpen1 && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modal}>
                                <div className={styles.xbutton}>
                                <button onClick={closeModal1}>X</button>
                                </div>
                                <div>
                                    <h1>Book Appointments</h1>
                                    <form>


                                        <div className={styles.modalidflex}>
                                        <label>Enter Your Id:  </label>
                                        <input className={styles.inputidarea} type="number" id="patientId" name="patientId" onChange={(e) => setPatientId(e.target.value)} />
                                        </div>


                                        {/* <br /> */}


                                        <div className={styles.modalflex}>
                                        <div className={styles.entersymptomsalign}>
                                        <label>Enter Symptoms: </label>
                                        </div>
                                        <textarea className={styles.inputarea} id="symptoms" name="symptoms" rows="4" cols="50"></textarea>
                                        </div>


                                        {/* <br /> */}

                                        <button className={styles.patientsbutton} onClick={getDepartments}>Choose department</button>
                                        <select className={styles.patiensselect} id="departments" name="departments" onChange={(e) => setSelectedDepartment(e.target.value)}>
                                            {departments.map((department, index) => {
                                                return <option key={index} value={department}>{department}</option>
                                            })}
                                        </select>
                                        <br />
                                        <button className={styles.patientsbutton} onClick={getdoctorsofdepartment}>Get Doctors of department</button>
                                        <select className={styles.patiensselect} id="doctors" name="doctors" onChange={(e) => setSelectedDoctor(e.target.value)}>
                                            {doctors.map((doctor, index) => {
                                                return <option key={index} value={doctor}>{doctor}</option>
                                            })}
                                        </select>
                                        <br />
                                        <button className={styles.patientsbuttonbook} onClick={book}>Book Appointment</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default PatientHome;
