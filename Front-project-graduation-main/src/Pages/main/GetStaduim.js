import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../Website/Context/UserContext";
import { DateTime } from 'luxon';
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayPalPayment from "../../component/PayPalPayment";

export default function GetStaduim() {
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [img,setImg]=useState("")
    const [link,setLink]=useState("")
    const [success,setSuccessfully]=useState(false)
    const [error,setError]=useState(false)
    const [userID,setID]=useState("")
    const [checkHour,setHour]=useState("")
    const id=window.location.pathname.split("/").slice(-1)[0];
    const [availableHours, setAvailableHours] = useState([]);
    const userNow =useContext(User);
    const cookie=new Cookies()
    const email=cookie.get('email')
  const user_details=cookie.get('userDetails')

  const [reservationMessage, setReservationMessage] = useState('');

  const nav =useNavigate();

    useEffect(()=>{
        axios
        .get(`http://localhost:5001/api/stadium/${id}`)
        .then((res)=>{
          console.log(res)
          
          
            setName(res.data.data.name);
            setID(res.data.data._id);
            setPrice(res.data.data.price);
            setDescription(res.data.data.description);
            setImg(res.data.data.avatar);
            setLink(res.data.data.link);
        })
    },[])
    useEffect(() => {
    const fetchAvailableHours = async () => {
      try {

        const response = await axios.get(`http://localhost:5001/api/hour/available-hours/${id}`);
        setAvailableHours(response.data.availableHours);
      } catch (error) {
        console.error('Error fetching available hours:', error);
      }
    };

    fetchAvailableHours();
  }, [id]);
  const handleReservation = async (selectedHour) => {
    try {
       
      const response = await axios.post('http://localhost:5001/api/hour/make-reservation', {
        userId: user_details._id,
        selectedHour,
        stadiumId:id,
        email
      });
      if(response.data.message==="Reservation successful"){
        // setHour(response.reservation.hour)
        setSuccessfully(true)
      }
      setReservationMessage(response.data.message);
      nav('/pages/main')
      console.log(response.data.message);
    } catch (error) {
      console.error('Error making reservation:', error);
      setReservationMessage('Failed to reserve the hour. Please try again.');
    }
  };
   
 
  const initialOptions = {
    clientId: "ATaHuvVu7zqr9o5fNzoEYaGb-_tGpdJhboEC5N8TD3u5E1MNIWxLxUu2tMa5dl9a1fZSjl2IsKvWX_xN",
    currency: "USD",
    intent: "capture",
};
      return (
        <PayPalScriptProvider options={initialOptions}>
        <div>
          <div style={{"padding":"4rem"}}></div>
          <div></div>
          <h2>Available Hours Table</h2>
          {reservationMessage && <h1>{reservationMessage}</h1>}
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Hour</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {availableHours.map((day) => (
                day.hours.map((hour) => (
                  <tr key={`${day.date}-${hour}`}>
                    <td>{DateTime.fromISO(day.date).toLocaleString(DateTime.DATE_SHORT)}</td>
                    <td>{DateTime.fromISO(hour).toLocaleString(DateTime.TIME_24_SIMPLE)}</td>
                    <td>Available</td>
                    <td>
                    {/* <button
                    onClick={() => handleReservation(DateTime.fromISO(hour).toISO())}
                    // disabled={isHourReserved(DateTime.fromISO(hour).toISO())}
                    style={{background:"#8d9799",color:"white",padding:"6px",borderRadius:"20px"}}
                    // onSubmit={nav('pages/main')}
                  >
                    
                    Navigate
                  </button>     */}
                    <Link to={`${hour}`}  >Navigate</Link>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
        </PayPalScriptProvider>
      );
    // (
    // <div>
        
          
    // <div >
    // <div style={{
    //     backgroundImage:`url(${`http://localhost:5001/uploads/${img}`})`,
    //     width:"100%",
    //     height:"300px",
    //     backgroundRepeat:"no-repeat",
    //     backgroundSize:"cover",
    //     backgroundPosition:"center",
    //     borderRadius:"10px"
    // }}>
    // </div>
    //     <div>
    //         <h4>{name}</h4>
    //         <p>{description}</p>
    //         <p> {price} $</p>

           
    //     </div>
    // </div>
    // </div>) 
}