import express from 'express'
import cors from 'cors'
import { checkcreds,insertPatient } from './database.js'

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
    if (isValid) {
        console.log("it is valid")
      res.status(200).json({ message: "Credentials are valid",validbool:1});
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
      if (isValid) {
          console.log("it is valid")
        res.status(200).json({ message: "Credentials are valid",validbool:1});
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
  app.listen(8080,()=>{
    console.log("The server is listening on 8080")
})  

