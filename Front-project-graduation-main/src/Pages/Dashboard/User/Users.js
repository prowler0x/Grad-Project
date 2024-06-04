import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {User} from "../../Website/Context/UserContext"

export default function Users() {
    const [users,setUsers]=useState([])
    const [runUseEffect,setrunUseEffect]=useState(0)
    const context=useContext(User)
    const token=context.auth.token;
    async function deleteUser(id){
        try {
            const res=await axios.delete(`http://localhost:5001/api/users/${id}`,{headers:{
                Accept:"application/json",
                Authorization:"Bearer "+token
            }})
            if(res.status===200){
            setrunUseEffect((pre)=>pre+1)
        }
        } catch (error) {
            console.log("None")
        }
      
    }
    
    // console.log(token.auth.token);
    useEffect(()=>{
        axios
        .get('http://localhost:5001/api/users',{headers:{
            Accept:"application/json",
            Authorization:"Bearer "+token
        }})
        // .then((res)=>res.json())
        .then((res)=>{
            // console.log(token);
            // context.setAuth((pre)=>{
            //     return {...pre,token:res.data.refreshToken}
            // })
            // console.log(token);


            setUsers(res.data.data);
        })

    },[runUseEffect])
    // useEffect(()=>{
    //     fetch(`http://localhost:5001/api/users/65b4b523494accf65914f45c`)
    //     .then((res)=>res.json())
    //     .then((res)=>{
    //         console.log(res.data);
    //         // setUsers(res.data);
    //     })

    // },[])
    const showUsers=users.map((user,index)=>
    <tr key={index}>
        <td>{index+1}</td>
        <td>{user.firstName}</td>
        <td>{user.email}</td>
        <td>
            <Link to={`${user._id}`} >
        <i className="fa-solid fa-pen" style={{
            color:"#74afb9",
            fontSize:"20px",
            paddingRight:"4px",
            cursor:'pointer'

        }}></i>
        </Link>
            <i 
            onClick={()=>deleteUser(user._id)}
            className="fa-solid fa-trash" style={{
            color:'#df0000',
            fontSize:"20px",
            cursor:'pointer'
            }}></i> 
            </td>
        </tr>
        )
      
    return (
        <div style={{paddingTop:"40px"}}>
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                        {showUsers}
                </tbody>
                <tfoot></tfoot>
            </table>
            {/* <button onClick={refresh}>refresh</button> */}
        </div>
    )
}