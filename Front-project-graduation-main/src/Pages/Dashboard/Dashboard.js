import { Outlet, Route, Routes } from "react-router-dom";
import User from "./User/Users";
import TopBar from "../../component/TopBar";
import SideBar from "../../component/SideBar";

export default function Dashboard(){
    return <div className="dash">
        <TopBar/>
        <div className='content-flex'>
            <SideBar />
            <div style={{width:"80%"}}>
                <Outlet/>
               
            </div>
        </div>
            
        </div>;
}