import express from 'express'
import cors from 'cors'
import { checkcreds,insertPatient,getPatientID,getDepartments,getDoctorsOfDepartment,insertAppointment,getDocAppointments,updateAppointment,getpres,updateprescriptiontr,getmeds,getDoctorID} from './database.js'

const app=express()

app.use(cors())
// rest of your Express.js code
app.use(express.json())
app.get("/api",async(req,res)=>{
    res.status(200).json({message:"Hello World"});
})

app.post("/credspatient", async (req, res) => {
  const { name, password } = req.body;
  console.log("this is the name " + name);
  console.log("this is the password " + password);

  try {
    const isValid = await checkcreds(name, password,"Patients");
    const PatientID=await getPatientID(name,password);

    if (isValid) {
        console.log("it is valid")
      res.status(200).json({ message: "Credentials are valid",validbool:1,patientId:PatientID,patientname:name});
    } else {
        console.log("it is not valid")
      res.status(200).json({ message: "Invalid credentials",validbool:0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/credsdoc", async (req, res) => {
    const { name, password } = req.body;
    console.log("this is the name " + name);
    console.log("this is the password " + password);
  
    try {
      const isValid = await checkcreds(name, password,"Consultants");
      const doctorId=await getDoctorID(name,password);
      if (isValid) {
          console.log("it is valid")
        res.status(200).json({ message: "Credentials are valid",validbool:1,doctorId:doctorId,doctorname:name});
      } else {
          console.log("it is not valid")
        res.status(200).json({ message: "Invalid credentials",validbool:0 });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  app.post('/signuppatient', async (req, res) => {
    const { name, dob, mobileNumber, gender, password } = req.body;
    
    try {
      const newPatient = await insertPatient(name, dob, mobileNumber, gender, password);
      console.log(newPatient);
      res.status(201).json(newPatient);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while signing up the patient.' });
    }
  });

  app.get('/api/departments', async (req, res) => {
    try {
      const departments = await getDepartments();
      res.status(200).json(departments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching departments.' });
    }
  });

  app.get('/api/departments/docs', async (req, res) => {
    const {department} = req.query;
    try {
      const doctors = await getDoctorsOfDepartment(department);
      console.log(doctors);
      res.status(200).json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching doctors.' });
    }
  });

  app.post('/api/appointment', async (req, res) => {
    const { symptoms, doctor, patient, status } = req.body;
    console.log(symptoms, doctor, patient, status);
    try {
      const newAppointment = await insertAppointment(symptoms, doctor, patient, status);
      console.log(newAppointment);
      res.status(201).json(newAppointment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while booking the appointment.' });
    }
  } );


  app.get('/api/docprescriptions', async (req, res) => {
    const {doctorid} = req.query;
    try {
      const appointments = await getDocAppointments(doctorid);
      console.log(appointments);
      res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching appointments.' });
    }
  });


  app.post('/api/updateprescription', async (req, res) => {
    const { status, diagnosis, advice, consultant_notes, doctorid, presid,meds } = req.body;
    console.log(status, diagnosis, advice, consultant_notes, doctorid, presid,meds);
    try {
      const newAppointment = await updateAppointment(status, diagnosis, advice, consultant_notes, doctorid, presid);
      const updateprestr=await updateprescriptiontr(presid,meds);
      console.log(newAppointment);
      res.status(201).json(newAppointment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the appointment.' });
    }
  } );

  app.get('/api/patientprescriptions', async (req, res) => {
    const {patientId} = req.query;
    console.log(patientId);
    try {
      const appointments = await getpres(patientId);
      console.log(appointments);
      res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching appointments.' });
    }
  });

  app.get('/api/medicines', async (req, res) => {
    const {prescriptionId}=req.query;
    console.log(prescriptionId);
    try {
      const medicines = await getmeds(prescriptionId);
      console.log(medicines);
      res.status(200).json(medicines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching medicines.' });
    }
  }
) 
  app.listen(8080,()=>{
    console.log("The server is listening on 8080")
})  

