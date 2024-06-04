

import { useContext, useEffect, useState } from 'react';
import SubmitComponent from '../../../component/Forms/SubmitComponent';
import { User } from '../../Website/Context/UserContext';
import axios from 'axios';
export default function UpdateStaduim() {
    const [name,setName]=useState("")
    // const [description,setdescription]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [imgage,setImage]=useState("")
    const [accept,setAccept]=useState(false);
    const [flag,setFlag]=useState(false)
    const id=window.location.pathname.split("/").slice(-1)[0];
    // const [flag,setFlag]=useState(false)
    // console.log("HEELLO");
      useEffect(()=>{
        axios
        .get(`http://localhost:5001/api/stadium/${id}`)
        .then((res)=>{
            console.log(res);
            setName(res.data.data.name);
            setPrice(res.data.data.price);
            setDescription(res.data.data.description);
            // setEmail(data[0].email)
            // setUsers(res.data);
        })

    },[])
   async function Submit(e) {
        let flag =true;
        e.preventDefault();
        setAccept(true)
        if(name===''||price.length<2){
            flag=false;
        }else {
            flag=true;
        }
        // console.log(flag);
        try {
            if (flag===true) {
                // console.log("HI");
                let response=await axios.patch(`http://localhost:5001/api/stadium/${id}`,{
                    name:name,
                    price:price,
                    description:description,
                });
                // Send info
                console.log(response.status);
                if (response.status===200) {
                    // console.log("respose is "+response.status);
                    // window.localStorage.setItem(
                    //     'email',email
                    // )
                    window.location.pathname="/dashboard/users";
                }
    }
            
        } catch (error) {
            // setEmailError(error.response.status)
            console.log(error);
            // {
            //     setEmailError="<p>ERROR</p>"
            // }
        }
        
    }
    return (
        <div className='root'>
        <form action="" className="wrapper" onSubmit={Submit}>
            <h1>Update</h1>
            <div className="input-box">
                <input type="text"  id="" placeholder="Name"  value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            {name.length==0 &&accept &&<p className="error">Name is required </p>}
            <div className="input-box">
                <input type="text"  id="" placeholder="description"  value={description} onChange={(e)=>setDescription(e.target.value)} />
            </div>
            {description.length==0 &&accept &&<p className="error">description is required </p>}
            <div className="input-box">
                <input type="text" name="" id="" placeholder="Price" value={price} required onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            {/* { accept && <p className="error">Email is Already Exists </p>} */}
            {/* <div className="input-box">
                <input type="file" name="" id="" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div> */}
            {/* {password.length<8 &&accept &&<p className="error">password must be more than 8 character</p>}
            <div className="input-box">
                <input type="password" name="" id="" placeholder="Repeated Password" value={passwordR} onChange={(e)=>setPasswordR(e.target.value)}  />
            </div>
            {passwordR!==password&&accept&&<p className="error">password not equal</p>}
       */}
       
       
            <button className="btn" type="submit">Update</button>
        
    </form>
        </div>
    )
}
// import axios from "axios"
// import { useEffect, useState } from "react"
// import './index.css'
// import {User} from "../../Pages/Website/Context/UserContext"
// import { useContext } from "react"
// export default function SubmitComponent(props) {
//     const [name,setName]=useState(props.name)
//     const [lastName,setLastName]=useState(props.secondName)
//     const [email,setEmail]=useState(props.email)
//     const [emailError,setEmailError]=useState('')
//     const [password,setPassword]=useState('')
//     const [passwordR,setPasswordR]=useState('')
//     const [accept,setAccept]=useState(false);
//     // const [flag,setFlag]=useState(false)
//     // console.log("HEELLO");
//     const userNow =useContext(User);
//     console.log(userNow);
//     useEffect(()=>{
//         setName(props.name);
//         setLastName(props.secondName);
//         setEmail(props.email);
//     },[props.name,props.secondName,props.email])
//     // The problem here
//    async function Submit(e) {
//         let flag =true;
//         e.preventDefault();
//         setAccept(true)
//         if(name===''||password.length<8||password!==passwordR){
//             flag=false;
//         }else {
//             flag=true;
//         }
//         // console.log(flag);
//         try {
         
   
        
//                             console.log("HI");
//                             console.log(userNow.auth.token);
//                             let response=await axios.patch(`http://localhost:5001/api/users/${props.id}`,{
//                                 firstName:name,
//                                 lastName:lastName,
//                                 email:email,
//                                 password:password
//                             });
//                             // Send info
//                             console.log(response.status);
//                             if (response.status===200) {
//                                 // console.log("respose is "+response.status);
//                                 // window.localStorage.setItem(
//                                 //     'email',email
//                                 // )
//                                 window.location.pathname="/dashboard/users";
//                             }
                        
    
            
//         } catch (error) {
//             setEmailError(error.response.status)
//             // {
//             //     setEmailError="<p>ERROR</p>"
//             // }
//         }
        
//     }
//     return(
//         <div className='root'>
//             <form action="" className="wrapper" onSubmit={Submit}>
//                 <h1>{props.description}</h1>
//                 <div className="input-box">
//                     <input type="text"  id="" placeholder="Name"  value={name} onChange={(e)=>setName(e.target.value)} />
//                 </div>
//                 {name.length==0 &&accept &&<p className="error">Name is required </p>}
//                 <div className="input-box">
//                     <input type="text"  id="" placeholder="Last Name"  value={lastName} onChange={(e)=>setLastName(e.target.value)} />
//                 </div>
//                 {lastName.length==0 &&accept &&<p className="error">Second Name is required </p>}
//                 <div className="input-box">
//                     <input type="email" name="" id="" placeholder="Email"b value={email} required onChange={(e)=>setEmail(e.target.value)}/>
//                 </div>
//                 { accept&&emailError===400 && <p className="error">Email is Already Exists </p>}
//                 <div className="input-box">
//                     <input type="password" name="" id="" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
//                 </div>
//                 {password.length<8 &&accept &&<p className="error">password must be more than 8 character</p>}
//                 <div className="input-box">
//                     <input type="password" name="" id="" placeholder="Repeated Password" value={passwordR} onChange={(e)=>setPasswordR(e.target.value)}  />
//                 </div>
//                 {passwordR!==password&&accept&&<p className="error">password not equal</p>}
          
           
           
//                 <button className="btn" type="submit">Update</button>
            
//         </form>
//             </div>
//     )
// }
