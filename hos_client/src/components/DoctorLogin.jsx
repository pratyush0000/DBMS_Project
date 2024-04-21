import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './DoctorLogin.module.css';

const DoctorLogin = () => {
    const navigate = useNavigate();
    const instance = axios.create({
        baseURL: 'http://localhost:8080'
    });

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [credsCorrect, setCredsCorrect] = useState("");
    const [switchPage, setSwitchPage] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const creds = {
            name: name,
            password: password
        }
        instance.post('/credsdoc', creds)
            .then((res) => {
                const data = res.data;
                localStorage.setItem("DoctorID", `${data.doctorId}`);
                localStorage.setItem("DoctorName", `${data.doctorname}`);
                setCredsCorrect(data.message);
                setSwitchPage(data.validbool);
                setName("");
                setPassword("");
            })
            .catch((error) => console.error('Error:', error));
    }

    useEffect(() => {
        if (switchPage === 1) {
            navigate("/doctorhome");
        }
    }, [switchPage, navigate]);

    return (
        <>
            <div className={styles.flexcontainer}>
                <div className={styles.leftdiv}></div>
                <div className={styles.rightdiv}>
                    <form onSubmit={handleSubmit} className={styles.namepassbigbox}>
                        <div className={styles.namepasscontainer}>
                            <label>Name</label>
                            <input id="Name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={styles.namepasscontainer}>
                            <label htmlFor="password">Password</label>
                            <input id="Password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className={styles.additionalText}>
                            <Link to="/patientlogin" className={styles.loginAsDoctor}>Login as Patient</Link>
                        </div>
                        <button>Login</button>
                    </form>
                    {credsCorrect}
                </div>
            </div>
        </>
    )
}

export default DoctorLogin;
