
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../Website/Context/UserContext";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalPayment from "../../component/PayPalPayment";
import { StripeProvider, Elements } from 'react-stripe-elements';
import PaymentForm from './PaymentForm';
import { DateTime } from "luxon";
export default function GetOneHourInfo() {
  const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [img,setImg]=useState("")
    const [link,setLink]=useState("")
    const [success,setSuccessfully]=useState(false)
    const [error,setError]=useState(false)
    const [userID,setID]=useState("")
  const hour = window.location.pathname.split("/").slice(-1)[0];
  const cookie = new Cookies();
  const user_details = cookie.get('userDetails');

  const staduimID = cookie.get('staduimID');

  const id = window.location.pathname.split("/").slice()[3];
  const userNow = useContext(User);
  const email = cookie.get('email');
  const [reservationMessage, setReservationMessage] = useState('');
  const nav = useNavigate();
  const [isPaid, setIsPaid] = useState(false);
  
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
  const handleReservation = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/hour/make-reservation', {
        userId: user_details._id,
        selectedHour: hour,
        stadiumId: id,
        email
      });

      if (response.data.message === "Reservation successful") {
        setSuccessfully(true);
        nav('/pages/main'); // Move navigation inside the conditional block
      }

      setReservationMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error making reservation:', error);
      setReservationMessage('Failed to reserve the hour. Please try again.');
    }
  };
  const bookingHandler=async()=>{
    try {
      const res =await axios.post(`http://localhost:5001/booking/checkout-session/${id}`)
      const data=await res.json()
      if (!res.ok) {
        throw new Error(data.message + 'please try again')
      }
      if (data.session.url) {
        window.location.href=data.session.url
      }
    } catch (error) {
      
    }
  }
  const [stripe, setStripe] = useState(null);

  const onStripeLoad = (strp) => {
    setStripe(strp);
  };
  const initialOptions = {
    clientId: "AWDr92CAASOG4YBoYiYLGm-DHZ7wA106UEcRfrjx57mmBr79yoJxbEGWCXAOXHZumWo-vIH2LtxMmYkC",
    currency: "USD",
    intent: "capture",
  };
  const handlePaymentSuccess = (details, data) => {
    // Send payment details to your backend for processing
    // Update the state or redirect the user after successful payment
    setIsPaid(true);
  };
  // return (
  //   <button
  //       onClick={() => bookingHandler()}
  //       style={{
  //         background: "#8d9799",
  //         color: "white",
  //         padding: "6px",
  //         borderRadius: "20px",
  //         textAlign: "center",
  //         margin: '40rem',
  //         width: "20rem"
  //       }}
  //     >
  //       press
  //     </button>

  // )
  return (
 <div style={{margin:'100px'}}>
   <h1>{name}</h1>
<div style={{
        backgroundImage:`url(${`http://localhost:5001/uploads/${img}`})`,
        width:"100%",
        height:"200px",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        backgroundPosition:"center",
        borderRadius:"10px",
        margin:'10px'
    }} className="img">
    </div>
 
  <p>Are You Sure To Reserve<span>{DateTime.fromISO(hour).toLocaleString(DateTime.TIME_24_SIMPLE)}</span> This Hour If you Sure Press Reserve if Anything Else Please Ensure And Come Back</p>

 <button onClick={handleReservation} style={{margin:'10px'}}>
  Reserve
 </button>
 </div>
  );

}