import { useContext, useEffect, useState } from 'react';
import '../../../style.css';
import axios  from "axios";
import Header from '../../../component/Header';
import {User} from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
export default function SignUp() {
    
    const [email,setEmail]=useState('')
    const [emailError,setEmailError]=useState(false)
    const [password,setPassword]=useState('')
    
    const [accept,setAccept]=useState(false);
    const nav =useNavigate();
    const userNow =useContext(User);
    const cookie=new Cookies();
    console.log(userNow);
    
   async function Submit(e) {
        
        e.preventDefault();
        setAccept(true)
        
        try {
         
           
                // console.log("HI");
                let response=await axios.post('http://localhost:5001/api/users/login',{
                    email:email,
                    password:password
                }).then((res)=>{
                    const token =res.data.token;
                    const userDetails =res.data.data;
                     cookie.set('Bearer',token)
                     cookie.set('userDetails',userDetails)
                     cookie.set('email',userDetails.email)
                    
                    // console.log("Token : ",token);
                    // console.log("response : ",response);
                    // console.log(userDetails);
                    userNow.setAuth({token,userDetails});
                    localStorage.setItem("email",userDetails.email);

                    // console.log(userNow);
                })
                
                nav("/pages/main")
}
            
        catch (error) {
            if(error.response.status===422||error.response.status===401){
                setEmailError(true);
            }
          
            setAccept(true)
        }
        
    }
   
  
    return (
        <div >
            <Header/>
        
        <div className='root'>
            <form action="" className="wrapper" onSubmit={Submit} style={{boxSizing: "border-box",boxShadow: "1px 1px 10px 10px rgb(131, 189, 84)"}}>
                <h1>Login</h1>
            
                <div className="input-box">
                    <input type="email" name="" id="" placeholder="Email"b value={email} required onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                {/* { accept&&emailError && <p className="error">Email is Already Exists </p>} */}
                <div className="input-box">
                    <input type="password" name="" id="" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                {password.length<8 &&accept &&<p className="error">password must be more than 8 character</p>}
                
          
           
           
                <button className="btn" type="submit">Login</button>
                { accept&&emailError&& <p className="error" style={{textAlign:'center',marginTop:"22px"}}>Wrong email or password </p>}
            
        </form>
            </div>
        </div>

    )
}