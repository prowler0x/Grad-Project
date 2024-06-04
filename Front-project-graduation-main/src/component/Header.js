import { Link } from "react-router-dom"
import './Header.css'
import axios from "axios";
import Logout from "../Pages/Website/Auth/Logout";
export default function Header(){
    // const auth =
    // async function handleLogOut(){
    //     try {
    //         await axios.post('/api/users'); // Assuming your logout route is '/api/logout'
    //         // Additional client-side cleanup if needed
    //         console.log('Logout successful');
    //       } catch (error) {
    //         console.error('Error logging out:', error.message);
    //       }
    // }
    const logout=()=>{
        console.log("apple");
    }
    return (
        <div className="container">
        <nav style={{display:"flex",color:"white",alignItems:"center",justifyContent:"space-between",padding:'4px'}}>
            <div style={{display:"flex"}}>
            <h6><Link to='/home' className="headerText">Help</Link></h6>
            </div>
            <div style={{display:"flex"}}>
                    {/* {!window.localStorage.getItem('email')? */}
                    <div>
                        <Link  to="/register" className="btnL" style={{textAlign:"center"}}>
                            Register
                        </Link>
                        <Link to="/login" className="btnL"  style={{textAlign:"center"}}>
                            Login
                        </Link>
                        {/* <Link to="/dashboard"  className="btnL" style={{textAlign:"center"}}>
                            Dashboard
                        </Link> */}
                       
                    </div>
                    {/* <Link to="/logout" onClick={logout} className="btn" style={{textAlign:"center"}} >
                        Logout
                    </Link> */}
                    {/* <div className="btn" onClick={handleLogOut} style={{textAlign:"center"}}>Log out</div> */}

            </div>
        </nav>
        </div>
    )
}