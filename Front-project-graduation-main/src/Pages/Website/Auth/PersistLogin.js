import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/UserContext";
import axios from "axios";
import Loading from "../../../component/Loading";
import Cookies from "universal-cookie";

export default function  PersistLogin(){
    const [loading,setLoading]=useState(true)
    // const [refreshToken,setRefeshToken]=useState('');
    const context=useContext(User)
    var token=context.auth.token;
    // console.log(context.auth.userDetails);
    const cookie=new Cookies();
    const tokenCookie=cookie.get('Bearer')
    const userDetails=cookie.get('userDetails')

    context.setAuth((pre)=>{
        return{
            userDetails:userDetails,
            token:tokenCookie
        }
    })

    // const fun=useEffect(()=>{
    //     axios
    //     .get('http://localhost:5001/api/users',{headers:{
    //         Accept:"application/json",
    //         Authorization:"Bearer "+token
    //     }})
    //     // .then((res)=>res.json())
    //     .then((res)=>{
    //         // console.log(token);
    //         setRefeshToken(res.data.refreshToken)

    //         context.setAuth((pre)=>{
    //             return {...pre,token:res.data.refreshToken
    //             }

    //         })
    //         // console.log(token);


    //         // setUsers(res.data.data);
    //     })

    // },[])
    // !token?refreshToken:setLoading(false);
    useEffect(()=>{
        try {
            if (token) {
                setLoading(false)
            } else {
                // setLoading(false)
            }
        } catch (error) {
            console.log(error);

        }
        finally{
            setLoading(false)
        }
        },[token])
    
    return loading?<Loading/> :<Outlet/>
}