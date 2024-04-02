import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './PatientLogin.module.css';

const PatientLogin=()=>{


    const instance = axios.create({
        baseURL: 'http://localhost:8080'
      });


    const [name,setname]=useState("");
    const [password,setpassword]=useState("")
    const[credscorrect,setcredscorrect]=useState("")
    const [switchpage,setswitchpage]=useState(0);
    const[newpage,setnewpage]=useState("/patientlogin")
    const handlesubmit=(e)=>{
        e.preventDefault();
        const creds={
            name:name,
            password:password
          }
          instance.post('/credspatient',creds).then((res)=>{
            console.log("this is res", res);
            return res.data;
          }).then((data)=>{
            setcredscorrect(data.message);
            setswitchpage(data.validbool);
            if(data.validbool==0)
            {
                setnewpage("/patienthome")
            }
            console.log("this is data", data);
          }).catch((error) => console.error('Error:', error));

    }
    return (
        <>
            <div className={styles.flexcontainer}>
                <div className={styles.leftdiv}></div>
                <div className={styles.rightdiv}>
                    <form action="" onSubmit={handlesubmit} className={styles.namepassbigbox}>
                        <div className={styles.namepasscontainer}>
                            <label>Name</label>
                            <input type="string" placeholder="Enter name" onChange={e=>setname(e.target.value)} />
                        </div>
                        <div className={styles.namepasscontainer}>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter password" onChange={e=>setpassword(e.target.value)} />
                        </div>
                        <div className={styles.additionalText}>
                            {/* <span className={styles.loginAsDoctor}>Login as Doctor</span> */}
                            <Link to="/doctorlogin" className={styles.loginAsDoctor}>Login as Doctor</Link>
                            {/* <span className={styles.signUp}>New? Sign Up!</span> */}
                            <Link to="/patientsignup" className={styles.signUp}>New? Sign Up!</Link>
                        </div>
                        <button><Link to={newpage}>Login</Link></button>
                    </form>
                    {credscorrect}
                </div>
            </div>
        </>
    )
}

export default PatientLogin