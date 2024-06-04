import { Link, useNavigate } from "react-router-dom"
import '../Pages/Dashboard/dashboard.css'
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

export default function TopBar() {
    const cookies = new Cookies();

    // State to hold the value of the cookie
    // const [cookieValue, setCookieValue] = useState("");
  
    // useEffect(() => {
    //   // Read the cookie when the component mounts
    //   const storedCookie = cookies.get("email");
  
    //   if (storedCookie) {
    //     setCookieValue(storedCookie);
    //   }
    // }, []);
    const navigate=useNavigate();
    const auth=localStorage.getItem('email')
    async function handleLogOut(){
        // try {
        //     await axios.post('/api/users/logout').then((res)=>{console.log(res);}); // Assuming your logout route is '/api/logout'  
        //     // Additional client-side cleanup if needed
        //     console.log('Logout successful');
        //   } catch (error) {
        //     console.error('Error logging out:', error.message);
        //   }
        
        console.warn("hofa");
        cookies.remove('email')
        localStorage.clear();
        navigate('/login')
    }
    return (
            <div className="d-flex container top-bar">
                <div className="right-bar">
                <i class="fa-solid fa-futbol"></i>
                <h1 className="text">Stadiums</h1>
                </div>
                <div>
                <Link to='/pages/main' className="btn btn2">Go To Web Site</Link>
                {auth?
                <Link className="btn" onClick={handleLogOut} to="/login" style={{textAlign:"center"}}>Log out</Link>:""}
                {/* <Link to="/main"  className="btn" style={{textAlign:"center"}}>
                Main
            </Link> */}
            </div>
            </div>
        )
}