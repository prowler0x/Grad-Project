import { useContext, useEffect, useState } from 'react';
import '../../../style.css';
import axios  from "axios";
import Header from '../../../component/Header';
import {User} from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
export default function SignUp() {
    const [name,setName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [emailError,setEmailError]=useState(false)
    const [password,setPassword]=useState('')
    const [passwordR,setPasswordR]=useState('')
    const [accept,setAccept]=useState(false);
    const nav =useNavigate();
    const userNow =useContext(User);
    const cookie=new Cookies();
    // console.log(userNow);
    
   async function Submit(e) {
        
        e.preventDefault();
        setAccept(true)
        
        try {
         
           
                // console.log("HI");
                let response=await axios.post('http://localhost:5001/api/users/register',{
                    firstName:name,
                    lastName:lastName,
                    email:email,
                    password:password
                });
                const token =response.data.token;
                const userDetails =response.data.data;
                 cookie.set('Bearer',token)
                 cookie.set('token',userDetails)
                 cookie.set('email',userDetails.email)
                 localStorage.setItem("email",userDetails.email);
                console.log(response);
                console.log(userDetails);
                userNow.setAuth({token,userDetails});
                console.log("Hel");
                nav("/pages/main")
}
            
        catch (error) {
            console.log(error.response.status)
            if(error.response.status===400){
                setEmailError(true);
            }
          
            setAccept(true)
        }
        
    }
   
  
    return (
        <div>
            <Header/>
        
        <div className='root' >
            <form action="" className="wrapper" onSubmit={Submit} style={{boxSizing: "border-box",boxShadow: "1px 1px 10px 10px rgb(131, 189, 84)"}}>
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text"  id="" placeholder="First Name"  value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                {name.length==0 &&accept &&<p className="error">Name is required </p>}
                <div className="input-box">
                    <input type="text"  id="" placeholder="Last Name"  value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                </div>
                {lastName.length==0 &&accept &&<p className="error">Second Name is required </p>}
                <div className="input-box">
                    <input type="email" name="" id="" placeholder="Email"b value={email} required onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                { accept&&emailError && <p className="error">Email is Already Exists </p>}
                <div className="input-box">
                    <input type="password" name="" id="" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                {password.length<8 &&accept &&<p className="error">password must be more than 8 character</p>}
                <div className="input-box">
                    <input type="password" name="" id="" placeholder="Repeated Password" value={passwordR} onChange={(e)=>setPasswordR(e.target.value)}  />
                </div>
                {passwordR!==password&&accept&&<p className="error">password not equal</p>}
          
           
           
                <button className="btn" type="submit">Register</button>
            
        </form>
            </div>
        </div>

    )
}