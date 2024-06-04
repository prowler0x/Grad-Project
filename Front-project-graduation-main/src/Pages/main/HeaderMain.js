import './Pages.css'
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom"
import { User } from '../Website/Context/UserContext';
import { useContext } from 'react';

export default function HeaderMain() {
    const cookies = new Cookies();
    const navigate=useNavigate();
    const userNow =useContext(User);

    const user_details=cookies.get('userDetails')
    async function handleLogOut(){
        // try {
        //     await axios.post('/api/users/logout').then((res)=>{console.log(res);}); // Assuming your logout route is '/api/logout'  
        //     // Additional client-side cleanup if needed
        //     console.log('Logout successful');
        //   } catch (error) {
        //     console.error('Error logging out:', error.message);
        //   }
        cookies.remove('Bearer');
        cookies.remove('userDetails');
        cookies.remove('email');
        console.warn("hofa");
        userNow.setAuth({});

        localStorage.clear();
        navigate('/login')
    }
    return (<div>
        
        <header class="header" id="header">
        <a href="#" class="logo" className='header-text'>Extra Time</a>
        <i class='bx bx-menu' id="menu-icon"></i>
        <nav class="navbar">
        <Link  to={`/pages/main`} className="icon" >
                            Main
        </Link>
        <Link  to={`/pages/favorites`} className="icon" >
                            Favorites
        </Link>
        <Link  to="/pages/AboutUs"  className="icon" >
                            About us
        </Link>
        <Link  to="/pages/contact" className="icon" >
                            Contact
        </Link>
        <Link  to="/pages/help" className="icon" >
                            Help
        </Link>
        <Link  onClick={handleLogOut} to="/login" style={{textAlign:"center"}} className="icon">
            Log out
        </Link>
        <Link  to={`/pages/setting/${user_details._id}`} >
        <i class="fa-regular fa-user"></i>
        </Link>
        <span>
                Hi {user_details.firstName}!
        </span>
        </nav>
        </header>
    </div>)
}