
import { useContext, useEffect, useState } from 'react';
import SubmitComponent from '../../../component/Forms/SubmitComponent';
import { User } from '../../Website/Context/UserContext';
import axios from 'axios';
export default function UpdateUser() {
    const [name,setName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const id=window.location.pathname.split("/").slice(-1)[0];
    const [flag,setFlag]=useState(false)
    const [emailError,setEmailError]=useState('')
    const [password,setPassword]=useState('')
    const [passwordR,setPasswordR]=useState('')
    const [accept,setAccept]=useState(false);
    // console.log("HEELLO");
    const context=useContext(User)
    const token=context.auth.token;
    // var token=useContext(User)
    // console.log(token);
      useEffect(()=>{
        axios
        .get(`http://localhost:5001/api/users/${id}`)
        .then((res)=>{
            setName(res.data.data.firstName);
            setLastName(res.data.data.lastName);
            setEmail(res.data.data.email);
            // setEmail(data[0].email)
            // setUsers(res.data);
        })

    },[])
   async function Submit(e) {
        let flag =true;
        e.preventDefault();
        setAccept(true)
        if(name===''||password.length<8||password!==passwordR){
            flag=false;
        }else {
            flag=true;
        }
        // console.log(flag);
        try {
            if (flag===true) {
                // console.log("HI");
                let response=await axios.patch(`http://localhost:5001/api/users/${id}`,{
                    firstName:name,
                    lastName:lastName,
                    email:email,
                    password:password
                },{headers:{
                    Accept:"application/json",
                    Authorization:"Bearer "+token
                }});
//                 // Send info
                console.log(response.status);
                if (response.status===200) {
                    console.log("respose is "+response.status);
                    window.localStorage.setItem(
                        'email',email
                    )
                    window.location.pathname="/dashboard/users";
                }
//     }
            
        } 
    }
        catch (error) {
//             setEmailError(error.response.status)
//             // {
                setEmailError("error")
            }
            
        }
        
    
        return(
            <div className='root t1'>
                <form action="" className="wrapper" onSubmit={Submit}>
                    <h1>Updated</h1>
                    <div className="input-box">
                        <input type="text"  id="" placeholder="First Name"  value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    {name.length==0 &&accept &&<p className="error">Name is required </p>}
                    <div className="input-box">
                        <input type="text"  id="" placeholder="Last Name"  value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                    </div>
                    {lastName.length==0 &&accept &&<p className="error">Second Name is required </p>}
                    <div className="input-box">
                        <input type="email" name="" id="" placeholder="Email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
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
              
               
               
                    <button className="btn" type="submit">Update As Admin</button>
                
            </form>
                </div>
    )
}