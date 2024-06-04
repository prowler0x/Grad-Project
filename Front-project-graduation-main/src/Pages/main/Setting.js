
import { useContext, useEffect, useState } from 'react';
import './Setting.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { User } from '../Website/Context/UserContext';
export default function Setting() {
    const [name,setName]=useState("")
    const [lastName,setLastName]=useState("")
    const [email,setEmail]=useState("")
    const id=window.location.pathname.split("/").slice(-1)[0];
    const [flag,setFlag]=useState(false)
    const [emailError,setEmailError]=useState('')
    const [password,setPassword]=useState('')
    const [passwordR,setPasswordR]=useState('')
    const [accept,setAccept]=useState(false);
    const cookie=new Cookies();
    const context=useContext(User)
    const token=context.auth.token;
    const emailCookie=cookie.get('email')
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
                    window.location.pathname="/pages/main";
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
        
    return (<>
    <section className='setting'>
        <h1>Update Your Profile</h1>
        <form  method="" onSubmit={Submit}>
            {/* <!-- Replace 'update_profile.php' with the actual server-side script to handle the form submission --> */}
            <label for="username"  className='settingLabel'>Username:</label>           
            <input type="text"  id="username" name="username" placeholder="First Name"  value={name} onChange={(e)=>setName(e.target.value)} />
            {name.length==0 &&accept &&<p className="error">Name is required </p>}

           
            <label for="last" id="last" className='settingLabel'>Last Name:</label>
           <input type="text"  id="last" placeholder="Last Name"  value={lastName} onChange={(e)=>setLastName(e.target.value)} />
            {lastName.length==0 &&accept &&<p className="error">Second Name is required </p>}


            {/* <!-- Replace 'current_email' with the user's current email retrieved from your backend --> */}
            <label for="email" id="email" className='settingLabel'>Email:</label>
            <input type="email"  id="email" placeholder="Email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
            { accept&&emailError && <p className="error">Email is Already Exists </p>}
           

            <label for="newPassword" className='settingLabel'>New Password:</label>
            <input type="password" name="newPassword" id="newPassword" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {password.length<8 &&accept &&<p className="error">password must be more than 8 character</p>}

            <label for="confirmPassword" className='settingLabel'>Confirm New Password:</label>
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Repeated Password" value={passwordR} onChange={(e)=>setPasswordR(e.target.value)}  />


            <button type="submit" >Update Profile</button>

        </form>
    </section>
        </>
        )
}