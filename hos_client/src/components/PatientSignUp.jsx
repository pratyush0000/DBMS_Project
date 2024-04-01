import { useState } from "react";
import axios from 'axios';


const PatientSignUp = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8080'
  });

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const patientDetails = {
      name: name,
      dob: dob,
      mobileNumber: mobileNumber,
      gender: gender,
      password: password
    }
    instance.post('/signuppatient', patientDetails).then((res) => {
      console.log("this is res", res);
      return res.data;
    }).then((data) => {
      console.log("this is data", data);
    }).catch((error) => console.error('Error:', error));
  }

  return (
    <>
      <div >
        
        <div>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input type="string" placeholder="Enter name" onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label>Date of Birth</label>
              <input type="date" onChange={e => setDob(e.target.value)} />
            </div>
            <div>
              <label>Mobile Number</label>
              <input type="tel" placeholder="Enter mobile number" onChange={e => setMobileNumber(e.target.value)} />
            </div>
            <div>
              <label>Gender</label>
              <select onChange={e => setGender(e.target.value)}>
                <option value="">Select...</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div>
              <label>Password</label>
              <input type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
            </div>
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PatientSignUp;