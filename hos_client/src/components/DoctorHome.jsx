import React from 'react';
import styles from './DoctorHome.module.css';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorHome = () => {

      const instance = axios.create({
        baseURL: 'http://localhost:8080'
      });

const [isModalOpen1, setIsModalOpen1] = useState(false);
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
const [doctorid,setdoctorid] = useState(0);
const [prescription,setprescription] = useState([]);
const [diagnosis,setdiagnosis] = useState("");
const [advice,setadvice] = useState("");
const [consultant_notes,setconsultant_notes] = useState("");
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

const getappointments=async ()=>{
    console.log(doctorid);
  const response = await instance.get('/api/docprescriptions', {
    params: {
        doctorid: doctorid
    }
  });
  console.log(response);
  setprescription(response.data);
  return response.data; 
  }
    

const submitupdatedrecords = async (event,presid) => {
  event.preventDefault();
  console.log(diagnosis);
  console.log(advice);
  console.log(consultant_notes);
  console.log(doctorid);
  console.log(presid);

  const response = await instance.post('/api/updateprescription', {
    status: 1,
    diagnosis: diagnosis,
    advice: advice,
    consultant_notes: consultant_notes,
    doctorid: doctorid,
    presid: presid,
    meds: meds
  });
  
  console.log(response);
  closeModal1();
}
  return (
    <div>
     <label>Enter Your Id </label>
     <input type="number" id="doctorid" name="doctorid" onChange={(e) => setdoctorid(e.target.value)} />
     <button onClick={() => { openModal1(); getappointments(); }}>View Appointments</button>

     {isModalOpen1 && (
       <div className="modal">
         <button onClick={closeModal1}>Close</button>
         <div>
           <h1>appointments</h1>

           <form>
              <table>
                <thead>
                  <tr>

                    <th>Prescription ID</th>
                    <th>Status</th>
                    <th>Symptoms</th>

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
           </form>
         </div>
       </div>
     )}

{isAddModalOpen && (
        <div className="modal">
          <button onClick={closeAddModal}>Close</button>
          <div>
            <h1>Add Diagnosis and Advice</h1>

            <form>
              <label>
                Diagnosis:
                <input onChange={(event)=>setdiagnosis(event.target.value)} type="text" name="diagnosis" />
              </label>
              <label>
                Advice:
                <input onChange={(event)=>setadvice(event.target.value)} type="text" name="advice" />
              </label>
              <label>
                Consultant Notes:
                <input onChange={(event)=>setconsultant_notes(event.target.value)} type="text" name="consultant_notes" /> 
              </label>
              <button onClick={(event) => 
                {event.preventDefault();
                  setIsFormVisible(true)}}>Add Meds</button>
              {isFormVisible && (
                  <>
                    <label>
                      Medicine Name:
                      <input id="inpname" onChange={(event) => setCurrentMed({ ...currentMed, name: event.target.value })} type="text" name="name" />
                    </label>
                    <label>
                      Number of Days:
                      <input id="inpdays" onChange={(event) => setCurrentMed({ ...currentMed, noofdays: event.target.value })} type="number" name="noofdays" />
                    </label>
                    <label>
                      Frequency:
                      <input id="intimes" onChange={(event) => setCurrentMed({ ...currentMed, frequency: event.target.value })} type="text" name="frequency" />
                    </label>
                    <button onClick={(event) => {
                      event.preventDefault();
                      setMeds(prevMeds => [...prevMeds, currentMed]);
                      setCurrentMed({ name: '', noofdays: '', frequency: '' });
                      document.getElementById('inpname').value = '';
                      document.getElementById('inpdays').value = '';
                      document.getElementById('intimes').value = '';

                    }}>Add Med</button>
                    <br></br>

                  {meds.length > 0 && (
                     <>
                     <br></br>
                        <table>
                          <thead>
                            
                            <tr>
                              <th>Medicine Name</th>
                              <th>Number of Days</th>
                              <th>Frequency</th>
                            </tr>
                          </thead>
                          <tbody>
                            {meds.map((med, index) => (
                              <tr key={index}>
                                <td>{med.name}</td>
                                <td>{med.noofdays}</td>
                                <td>{med.frequency}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        </>
                      )}
                    </>
                  )}

              <button onClick={(event) => submitupdatedrecords(event, presIdToUpdate)} type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
   </div>
)
}
export default DoctorHome;




