import { Outlet } from "react-router-dom";
import HeaderMain from "./HeaderMain";
import './Pages.css'
export default function AboutUs() {
    return (<div><HeaderMain/>   
    <div >
        <div>

    <Outlet/>
        </div>
   
</div></div>)
}