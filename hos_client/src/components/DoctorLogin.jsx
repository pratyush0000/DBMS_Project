import { useState } from "react"
import axios from 'axios'

const DoctorLogin=()=>{


    const instance = axios.create({
        baseURL: 'http://localhost:8080'
      });


    const [name,setname]=useState("");
    const [password,setpassword]=useState("")
    const[credscorrect,setcredscorrect]=useState("Passwords not correct")
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
        <div>
            <div>
                <form action="" onSubmit={handlesubmit}>
                    <div>
                        <label>Name</label>
                        <input type="string" placeholder="Enter name" onChange={e=>setname(e.target.value)}></input>

                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter password" onChange={e=>setpassword(e.target.value)}></input>
                        
                        
                    </div>
                    <button>Login</button>
                </form>
                 {credscorrect}
            </div>
        </div>
    )
}

export default DoctorLogin