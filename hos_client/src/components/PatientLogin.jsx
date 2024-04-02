import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './PatientLogin.module.css';

const PatientLogin = () => {
    const navigate = useNavigate();
    const instance = axios.create({
        baseURL: 'http://localhost:8080'
    });
  const [name, setname] = useState("");
    const [password, setpassword] = useState("")
    const [credscorrect, setCredsCorrect] = useState("")
    const [switchPage, setSwitchPage] = useState(0);

    const handlesubmit = (e) => {
        e.preventDefault();
        const creds = {
            name: name,
            password: password
        }
        instance.post('/credsPatient', creds).then((res) => {
         
            const data = res.data;
            setCredsCorrect(data.message);
            setSwitchPage(data.validbool);
            console.log(data.validbool);
            console.log(switchPage)

            document.getElementById("Name").value = "";
            document.getElementById("Password").value = "";
        
        }).catch((error) => console.error('Error:', error));
    }

    useEffect(() => {
        if (switchPage === 1) {
            navigate("/patienthome");
        }
    }, [switchPage]);
    return (
        <>
            <div className={styles.flexcontainer}>
                <div className={styles.leftdiv}></div>
                <div className={styles.rightdiv}>
                    <form action="" onSubmit={handlesubmit} className={styles.namepassbigbox}>
                        <div className={styles.namepasscontainer}>
                            <label>Name</label>
                            <input id="Name" type="string" placeholder="Enter name" onChange={(e)=>setname(e.target.value)} />
                        </div>
                        <div className={styles.namepasscontainer}>
                            <label htmlFor="password">Password</label>
                            <input id="Password" type="password" placeholder="Enter password" onChange={e=>setpassword(e.target.value)} />
                        </div>
                        <div className={styles.additionalText}>
                            {/* <span className={styles.loginAsDoctor}>Login as Doctor</span> */}
                            <Link to="/doctorlogin" className={styles.loginAsDoctor}>Login as Doctor</Link>
                            {/* <span className={styles.signUp}>New? Sign Up!</span> */}
                            <Link to="/patientsignup" className={styles.signUp}>New? Sign Up!</Link>
                        </div>
                        <button>Login</button>
                    </form>
                    {credscorrect}
                </div>
            </div>
        </>
    )
}

export default PatientLogin