import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {User} from "../../Website/Context/UserContext"

export default function Stadia() {
    const [stadia,setStadia]=useState([])
    const [img,setImage]=useState([])
    const [runUseEffect,setrunUseEffect]=useState(0)
    async function deleteStaduim(id){
        try {
            const res=await axios.delete(`http://localhost:5001/api/stadium/${id}`)
            if(res.status===200){
            setrunUseEffect((pre)=>pre+1)
        }
        } catch (error) {
            console.log("None")
        }
      
    }
    const context=useContext(User)
    const token=context.auth.token;
    useEffect(()=>{
        axios
        .get('http://localhost:5001/api/stadium',{headers:{
            Accept:"application/json",
            Authorization:"Bearer "+token
        }})
        // .then((res)=>res.json())

        .then((res)=>{
            // console.log(res.data.data.refreshToken);
            // context.setAuth((pre)=>{
            //     return {...pre,token:res.data.data.refreshToken}
            // })
            // console.log(context.auth);

            // context.setAuth((pre)=>{
                // return {...pre,token:res.data.token}
            // })
            var arr=[];
            for (let i = 0; i < res.data.data.stadiums.length; i++) {
                 arr.push (res.data.data.stadiums[i].avatar);
            }
            // console.log(arr);
            setImage(arr);
            setStadia(res.data.data.stadiums);

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
    // useEffect(()=>{
    //     axios
    //     .get(`http://localhost:5001/${}`,{headers:{
    //         Accept:"application/json",
    //         Authorization:"Bearer "+token.auth.token
    //     }})
    //     // .then((res)=>res.json())
    //     .then((res)=>{
    //         console.log(res.data.data.stadiums);
    //         setStadia(res.data.data.stadiums);
    //     })

    // },[runUseEffect])
//     const arr={}
//     const showImages=stadia.map((stadium,index)=>
//     {    
//     arr[index]=stadium.avatar[index];
//     // return arr;
// }    );
    
    //   function getImage(params) {
        
    //   }
        // useEffect(()=>{
        //     axios
        //     .get(`http://localhost:5001/${arr[0]}`,{headers:{
        //         Accept:"application/json",
        //         Authorization:"Bearer "+token.auth.token
        //     }})
        //     // .then((res)=>res.json())
        //     .then((res)=>{
        //         // console.log(res.data.data.stadiums);
        //         // setImage(res.data.data.stadiums);
        //     })
    
        // },[runUseEffect])
    
    // console.log(arr);
    const showStadia=stadia.map((stadium,index)=>
    <tr key={index}>
        <td>{index+1}</td>
        <td>{stadium.name}</td>
        <td>{stadium.price}</td>
        <td>{stadium.description}</td>
        <td><img src={`http://localhost:5001/uploads/${img[index]}`}  style={{width:'100px',height:'100px'}}/></td>
        <td>
            <Link to={`${stadium._id}`} >
        <i className="fa-solid fa-pen" style={{
            color:"#74afb9",
            fontSize:"20px",
            paddingRight:"4px",
            cursor:'pointer'

        }}></i>
        </Link>
            <i 
            onClick={()=>deleteStaduim(stadium._id)}
            className="fa-solid fa-trash" style={{
            color:'#df0000',
            fontSize:"20px",
            cursor:'pointer'
            }}></i> 
            </td>
        </tr>
        )
        // async function refresh(){
        //     try {
        //         await axios.get()
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    return (
        <div style={{padding:"40px"}}>
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>image</th>
                    </tr>
                </thead>
                <tbody>
                        {showStadia}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}
