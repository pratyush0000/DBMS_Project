import React from 'react';
import styles from './DoctorHome.module.css'; // Import CSS module
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/unitylogo.png';

const DoctorHome = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8080'
  });

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  //const [doctorid, setDoctorid] = useState(0);
  const doctorid = parseInt(localStorage.getItem("DoctorID"));
  const [prescription, setPrescription] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [consultantNotes, setConsultantNotes] = useState("");
  const [presIdToUpdate, setPresIdToUpdate] = useState(0);
  const [meds, setMeds] = useState([]);
  const [currentMed, setCurrentMed] = useState({ name: '', noofdays: '', frequency: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  const openAddModal = (event, presId) => {
    event.preventDefault();
    setPresIdToUpdate(presId); // Save the Pres_ID of the prescription to update
    setIsAddModalOpen(true);
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  }

  const getappointments = async () => {
    console.log(doctorid);
    const response = await instance.get('/api/docprescriptions', {
      params: {
        doctorid: doctorid
      }
    });
    console.log(response);
    setPrescription(response.data);
    return response.data;
  }

  const submitUpdatedRecords = async (event, presid) => {
    event.preventDefault();
    console.log(diagnosis, advice, consultantNotes, doctorid, presid);

    const response = await instance.post('/api/updateprescription', {
      status: 1,
      diagnosis: diagnosis,
      advice: advice,
      consultant_notes: consultantNotes,
      doctorid: doctorid,
      presid: presid,
      meds: meds
    });
    
    console.log(response);
    closeModal1();
    closeAddModal();
  }

  return (
    <>
    <div className={styles.logoContainer}>
                    <img src={logo} alt="UnityLogo" className={styles.logo} />
                </div>
    <div className={styles.container}>
      <div className={styles.center}>
        <div className={styles.centerflex}>
        <div className={styles.welcomedoctor}>Welcome {localStorage.getItem("DoctorName")}</div>
        <button onClick={() => { openModal1(); getappointments(); }}>View Appointments</button>
        </div>
      </div>

      {isModalOpen1 && (
  <div className={`${styles.modal} ${styles.centered}`}>
    <button onClick={closeModal1}>X</button>
    <div>
      <h1>Appointments</h1>
      {prescription.length === 0 ? (
        <div>
          <h2>No pending appointments</h2>
        </div>
      ) : (
        <table className={styles.appointmentsTable}>
          <thead>
            <tr>
              <th>Prescription ID</th>
              <th>Status</th>
              <th>Symptoms</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {prescription.map((prescription) => (
              prescription.status === 0 && (
                <tr key={prescription.Pres_ID}>
                  <td>{prescription.Pres_ID}</td>
                  <td>{prescription.status}</td>
                  <td>{prescription.symptoms}</td>
                  <td><button onClick={(event) => openAddModal(event, prescription.Pres_ID)}>ADD</button></td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
  
)}


{isAddModalOpen && (
  <div className={`${styles.modal} ${styles.centered}`}>
    <button className={styles.closeButton} onClick={closeAddModal}>X</button>
    <div>
      <h1>Add Diagnosis and Advice</h1>

      <form className={styles.form}>
        <label className={styles.formLabel}>
          Diagnosis:
          <input className={styles.input} onChange={(event) => setDiagnosis(event.target.value)} type="text" name="diagnosis" />
        </label>
        <label className={styles.formLabel}>
          Advice:
          <input className={styles.input} onChange={(event) => setAdvice(event.target.value)} type="text" name="advice" />
        </label>
        <label className={styles.formLabel}>
          Consultant Notes:
          <input className={styles.input} onChange={(event) => setConsultantNotes(event.target.value)} type="text" name="consultant_notes" />
        </label>
        <button className={styles.addButton} onClick={(event) => {
          event.preventDefault();
          setIsFormVisible(true);
        }}>Add Meds</button>

        {isFormVisible && (
          <>
            <table className={styles.medsTable}>
              <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Number of Days</th>
                    <th>Frequency</th>
                    <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input className={styles.input} id="inpname" onChange={(event) => setCurrentMed({ ...currentMed, name: event.target.value })} type="text" name="name" />
                  </td>
                  <td>
                    <input className={styles.input} id="inpdays" onChange={(event) => setCurrentMed({ ...currentMed, noofdays: event.target.value })} type="number" name="noofdays" />
                  </td>
                  <td>
                    <input className={styles.input} id="intimes" onChange={(event) => setCurrentMed({ ...currentMed, frequency: event.target.value })} type="text" name="frequency" />
                  </td>
                  <td>
                    <button className={styles.addButton} onClick={(event) => {
                      event.preventDefault();
                      setMeds(prevMeds => [...prevMeds, currentMed]);
                      setCurrentMed({ name: '', noofdays: '', frequency: '' });
                      document.getElementById('inpname').value = '';
                      document.getElementById('inpdays').value = '';
                      document.getElementById('intimes').value = '';
                    }}>Add Med</button>
                  </td>
                </tr>
                {meds.length > 0 && (
                  <>
                    {meds.map((med, index) => (
                      <tr key={index}>
                        <td>{med.name}</td>
                        <td>{med.noofdays}</td>
                        <td>{med.frequency}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </>
        )}

        <button className={styles.submitButton} onClick={(event) => submitUpdatedRecords(event, presIdToUpdate)} type="submit">Submit</button>
      </form>
    </div>
  </div>
)}

    </div>
    </>
  )

}

export default DoctorHome;
