import { useState } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom';
import styles from './DoctorLogin.module.css';

const DoctorLogin=()=>{


    const instance = axios.create({
        baseURL: 'http://localhost:8080'
      });


    const [name,setname]=useState("");
    const [password,setpassword]=useState("")
    const[credscorrect,setcredscorrect]=useState("")
    const [switchpage,setswitchpage]=useState(0);
    const handlesubmit=(e)=>{
        e.preventDefault();
        const creds={
            name:name,
            password:password
          }
          instance.post('/credsdoc',creds).then((res)=>{
            console.log("this is res", res);
            return res.data;
          }).then((data)=>{
            setcredscorrect(data.message);
            setswitchpage(data.validbool);
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
                            <Link to="/patientlogin" className={styles.loginAsDoctor}>Login as Patient</Link>
                            {/* <span className={styles.signUp}>New? Sign Up!</span> */}
                            {/* <Link to="/patientsignup" className={styles.signUp}>New? Sign Up!</Link> */}
                        </div>
                        <button>Login</button>
                    </form>
                    {credscorrect}
                </div>
            </div>
        </>
    )
}

export default DoctorLogin