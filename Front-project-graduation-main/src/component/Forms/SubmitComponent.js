import axios from "axios"
import { useEffect, useState } from "react"
import './index.css'
import {User} from "../../Pages/Website/Context/UserContext"
import { useContext } from "react"
export default function SubmitComponent(props) {
    const [name,setName]=useState(props.name)
    const [lastName,setLastName]=useState(props.secondName)
    const [email,setEmail]=useState(props.email)
    const [emailError,setEmailError]=useState('')
    const [password,setPassword]=useState('')
    const [passwordR,setPasswordR]=useState('')
    const [accept,setAccept]=useState(false);
    // const [flag,setFlag]=useState(false)
    // console.log("HEELLO");
    const userNow =useContext(User);
    console.log(userNow);
    useEffect(()=>{
        setName(props.name);
        setLastName(props.secondName);
        setEmail(props.email);
    },[props.name,props.secondName,props.email])
    // The problem here
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
          if(props.method==="post"){
            if (flag===true) {
                // console.log("HI");
                let response=await axios.post('http://localhost:5001/api/users/register',{
                    firstName:name,
                    lastName:lastName,
                    email:email,
                    password:password
                });
                const token =response.data.token;
                const userDetails =response.data.data;
                // console.log(response.data.token);
                // console.log(userDetails);
                userNow.setAuth({token,userDetails})
                // Send info
                    // console.log("respose is "+response.status);
                // if (response.status===201) {
                //     // props.localStorage&&window.localStorage.setItem(
                //     //     'email',email
                //     // )
                //     // window.location.pathname="register";
                // }
    }
}
    else if(props.method==="update") {
        if (flag===true) {
                            console.log("HI");
                            console.log(userNow.auth.token);
                            let response=await axios.patch(`http://localhost:5001/api/users/${props.id}`,{headers:{
                                Accept:"application/json",
                                Authorization:"Bearer "+userNow.auth.token
                            }},{
                                firstName:name,
                                lastName:lastName,
                                email:email,
                                password:password
                            });
                            // Send info
                            console.log(response.status);
                            if (response.status===200) {
                                // console.log("respose is "+response.status);
                                window.localStorage.setItem(
                                    'email',email
                                )
                                window.location.pathname="/dashboard/users";
                            }
                        }
    }
            
        } catch (error) {
            setEmailError(error.response.status)
            // {
            //     setEmailError="<p>ERROR</p>"
            // }
        }
        
    }
    return(
        <div className='root t1'>
            <form action="" className="wrapper" onSubmit={Submit}>
                <h1>{props.title}</h1>
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
                { accept&&emailError===400 && <p className="error">Email is Already Exists </p>}
                <div className="input-box">
                    <input type="password" name="" id="" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                {password.length<8 &&accept &&<p className="error">password must be more than 8 character</p>}
                <div className="input-box">
                    <input type="password" name="" id="" placeholder="Repeated Password" value={passwordR} onChange={(e)=>setPasswordR(e.target.value)}  />
                </div>
                {passwordR!==password&&accept&&<p className="error">password not equal</p>}
          
           
           
                <button className="btn" type="submit">{props.button}</button>
            
        </form>
            </div>
    )
}
