import React, { useEffect,useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Website/Auth/SignUp.js";
import Login from "./Pages/Website/Auth/Login.js";
import Logout from "./Pages/Website/Auth/Logout.js";
import About from "./Pages/Website/About.js";
import Dashboard from "./Pages/Dashboard/Dashboard.js";
import Users from "./Pages/Dashboard/User/Users.js";
import UpdateUser from "./Pages/Dashboard/User/UpdateUser.js";
import Home from "./Pages/Website/Home.js";
import CreateUser from "./Pages/Dashboard/User/CreateUser.js";
import RequireAuth from "./Pages/Website/Auth/RequireAuth.js";
import Stadia from "./Pages/Dashboard/Stadia/Stadia.js";
import CreateStaduim from "./Pages/Dashboard/Stadia/CreateStaduim.js";
import UpdateStaduim from "./Pages/Dashboard/Stadia/UpdateStaduim.js";
import PersistLogin from "./Pages/Website/Auth/PersistLogin.js";
import Main from "./Pages/main/Main.js";
import AboutUs from "./Pages/main/AboutUs.js";
import Pages from "./Pages/main/Pages.js";
import GetStaduim from "./Pages/main/GetStaduim.js";
import Contact from "./Pages/main/Contact.js";
import Setting from "./Pages/main/Setting.js";
import Help from "./Pages/main/Help.js";
import Favorites from "./Pages/main/Favorites.js";
import GetOneHourInfo from "./Pages/main/GetOneHourInfo.js";
import CheckoutSuccess from "./Pages/main/CheckoutSuccess.jsx"
export default function App() {
   
    return (
    
        <div>
        <Routes>
                <Route path="/register" element={<SignUp/>}/>                
                <Route path="/login" element={<Login/>}/>                
                <Route path="/home" element={<Home/>}/>  
                {/* <Route path="/logout" element={<Logout/>}/>   */}
            <Route element={<PersistLogin/>}  > 
                <Route element={<RequireAuth/>}>            
                    <Route path="/about" element={<About/>}/>   
                    <Route path="/pages" element={<Pages/>}>
                        <Route path="main" element={<Main/>}/>
                        <Route path="favorites" element={<Favorites/>}/>
                        <Route path="favorites/:id" element={<GetStaduim/>}/>
                        <Route path="main/:id" element={<GetStaduim/>}/>
                        <Route path="main/:id/:hour" element={<GetOneHourInfo/>}/>
                        <Route path="main/:id/:hour/checkout-success" element={<CheckoutSuccess/>}/>
                        <Route path="AboutUs" element={<AboutUs/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="setting/:id" element={<Setting/>}/>
                        <Route path="help" element={<Help/>}/>
                    </Route>

                    <Route path="/dashboard" element={<Dashboard/>}>
                        <Route path="users" element={<Users/>}/>
                        <Route path="user/create" element={<CreateUser/>}/>
                        <Route path="users/:id" element={<UpdateUser/>}/>
                        <Route path="user/stadia" element={<Stadia/>}/>
                        <Route path="user/stadia/create" element={<CreateStaduim/>}/>
                        <Route path="user/stadia/:id" element={<UpdateStaduim/>}/>
                    </Route>              
                </Route>              
            </Route>              
        </Routes>
        </div>
      
    )
}
//     Third App
//     const [data,setData]=useState([])
//     // console.log(data1);
//     const dataShow=data.map((item,index)=><Name name={item} key={index}/>)
//     useEffect(()=>{
//         fetch('http://localhost:5001/api/stadium')
//         .then((res)=>res.json())
//         .then((data)=>setData(data.data.stadiums.map((el)=>el.name))
//         // {
//             // var elements=[];
//             // elements=data.data.stadiums.map((el)=>el);
//             // console.log(elements);
//             // setData();
//             // setData(elements);
//             // var names=[];
//             // var prices=[];
//             // var des=[];
//             // names=data.data.map((el)=>el.name);
//             // console.log(data.data.map((el)=>el.price));
//             // names=data.data.map((el)=>console.log(el.des));
//             // return data.data.map((el)=>console.log(el.price))
//         // }
//         );
//     },[])
 
//     return (
//     <div>{dataShow}</div>
//     )
// }
// third App
// begin of the second app
    // // console.log(setHady);
    // // const dataShow=data.map(el =><Card key={el.id} img={el.img} title={el.title} instructor={el.instructor} price={el.price}/>);
    // const [firstName,setFirstName]=useState("HI");
    // const [lastName,setlastName]=useState("HI SECOND NAME");
    // const [Email,setEmail]=useState("EMAILs");    
    // console.log(firstName);
    // console.log(lastName);
    // console.log(Email);
    // return (
    //    <div>
    //     <form action="">
    //         <label htmlFor="1">First Name : </label>
    //      <input 
    //          id="1"
    //           placeholder="First name" 
    //            required 
    //            value={firstName}
    //      onChange={function(e){ 
    //         return setFirstName(e.target.value)
    //     }
       
    //         }/>
    //     <label htmlFor="1">Second Name : </label>
    //     <input id="1" 
    //     placeholder="First name"
    //      required
    //       value={lastName}
    //       onChange={function(e){ 
    //          return setlastName(e.target.value)
    //      }
    //     }
    //       />
    //     <label htmlFor="1">Email : </label>
    //     <input id="1" 
    //     placeholder="Email"
    //      type="email" 
    //      required
    //       value={Email}
    //       onChange={function(e){ 
    //         return setEmail(e.target.value)
    //     }}/>
    //     <button>Submit</button>
    //     </form>
    //    </div>
    // )  
    // THIS THE is about use state 
    //   const [color,setColor]=React.useState(true)

// function toggle() {
//        setColor()
//     }
    // Second App
    // <div style={{
    //     cursor:"pointer",
    //     fontSize:"20px",
    //     textAlign:"center"
    // }}
    // onClick={()=>setColor((el)=>!el)}
    // ><i className="fa-solid fa-star" style={{color:color?"yellow":"black"}}></i></div>

    // First App we do it 
    //  (
    //     <div style={{
    //         display:"flex",
    //         gap:"20px",
    //         flexWrap:"wrap"
    //     }}>
    //        {dataShow}
    //     </div>
    // );
// }