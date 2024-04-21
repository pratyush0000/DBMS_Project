import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PatientHome.module.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const PatientHome = () => {
    const location = useLocation();
    const patientId = location.state ? location.state.patientId : null; // Check if location.state is defined

    const instance = axios.create({
        baseURL: 'http://localhost:8080'
    });

    const [isModalOpen1, setIsModalOpen1] = useState(false);
    

    const openModal1 = () => {
        setIsModalOpen1(true);
    };

    const closeModal1 = () => {
        setIsModalOpen1(false);
    };
    const [isPrescriptionsModalOpen, setIsPrescriptionsModalOpen] = useState(false);

    const openPrescriptionsModal = () => {
        setIsPrescriptionsModalOpen(true);
    };

    const closePrescriptionsModal = () => {
        setIsPrescriptionsModalOpen(false);
    };


    const [prescriptions, setPrescriptions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('General Medicine');
    const [doctorsobject, setdoctorsobject] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selecteddoctor, setSelectedDoctor] = useState('Dr. Anand Gupta');
    const [Patientid, setPatientId] = useState(null);
    const [medicines, setMedicines] = useState([]);

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
        closeModal1();
    
        alert("Appointment Booked Successfully");
        console.log(response);
    }

    const getPrescriptions = async () => {
        const response = await instance.get('/api/patientprescriptions', {
            params: {
                patientId: Patientid,
            }
        });
    
        console.log(response);
    
        const prescriptionsWithMeds = await Promise.all(response.data.map(async (prescription) => {
            const medsresponse = await instance.get('/api/medicines', {
                params: {
                    prescriptionId: prescription.Pres_ID,
                }
            });
            console.log(medsresponse);
            return {...prescription, medicines: medsresponse.data};
        }));
    
        setPrescriptions(prescriptionsWithMeds);
    
        return prescriptionsWithMeds;
    }

    useEffect(() => {
        if (isPrescriptionsModalOpen) {
            getPrescriptions();
        }
    }, [isPrescriptionsModalOpen]);
    return (
        <>
            <div className={styles.fullpage}>
                <div className={styles.logoContainer}>
                    <img src='hos_client\src\assets\unitylogo.png' alt="UnityLogo" className={styles.logo} />
                </div>

                <div className={styles.divflexwelcomepatint}>
                <div className={styles.welcomepatient}>Welcome Patient</div>
                
                
                
                <div className={styles.fulldiv}>
    
                    <div className={styles.enteridflex}>
                            {/* <label>Enter Your Id:  </label> */}
                            <input className={styles.inputidarea} type="number" id="patientId" placeholder="Enter ID" name="patientId" onChange={(e) => setPatientId(e.target.value)} />
                    </div>
                <div className={styles.buttonhomeflex}>

                    <button className={styles.patientsbuttonreal} onClick={openModal1}>Book Appointment</button>
                    {isModalOpen1 && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modal}>
                                <div className={styles.xbutton}>
                                    <button onClick={closeModal1}>X</button>
                                </div>
                                <div>
                                    <h1>Book Appointments</h1>
                                    <form>
                                        <div className={styles.modalflex}>
                                            <div className={styles.entersymptomsalign}>
                                                <label>Enter Symptoms: </label>
                                            </div>
                                            <textarea className={styles.inputarea} id="symptoms" name="symptoms" rows="4" cols="50"></textarea>
                                        </div>
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



                    
                <div className={styles.middiv}> OR </div>




                <button onClick={openPrescriptionsModal} className={styles.patientsbuttonreal}>View Prescriptions</button>

                {isPrescriptionsModalOpen && (
  <div className={styles.modalOverlay}>
    <div className={`${styles.modal} ${styles.prescriptionModal}`}>
      <div className={styles.xbutton}>
        <button onClick={closePrescriptionsModal}>X</button>
      </div>
      <div className={styles.modalflex}>
        <h1 className={styles.modalTitle}>Prescriptions</h1>
        {prescriptions.map((prescription) => (
          <div className={styles.prescriptionBox}>
            <table className={styles.prescriptionTable}>
              <tbody>
                <tr>
                  <th>Prescription ID</th>
                  <th>Symptoms</th>
                  <th>Date</th>
                  <th>Diagnosis</th>
                  <th>Advice</th>
                  <th>Consultant Notes</th>
                </tr>
                <tr key={prescription.Pres_ID}>
                  <td>{prescription.Pres_ID}</td>
                  <td>{prescription.symptoms}</td>
                  <td>{prescription.Date}</td>
                  <td>{prescription.Diagnosis}</td>
                  <td>{prescription.Advice}</td>
                  <td>{prescription.Consultant_Notes}</td>
                </tr>
                <tr>
                  <td colSpan="6">
                    <table className={styles.prescriptionTable}>
                      <thead>
                        <tr>
                          <th>Medicine</th>
                          <th>No of Days</th>
                          <th>Frequency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prescription.medicines.map((medicine) => (
                          <tr key={medicine.Name}>
                            <td>{medicine.Name}</td>
                            <td>{medicine.Noofdays}</td>
                            <td>{medicine.Frequency}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

                </div>
                </div>
                </div>
            </div>
        </>
    )
}
export default PatientHome;
