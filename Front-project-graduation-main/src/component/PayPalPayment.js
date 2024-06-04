import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalPayment() {
  const createOrder =async (data) => {
    // Order is created on the server and the order id is returned
    return await fetch("http://localhost:5001/api/orders", {
      method: "POST",
       headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
       product:{
        description:"houuuuuuuuuuuuuuur",
        cost:"100"
       }
      }),
    })
    .then((response) => response.json())
    .then((order) => order.id);
  };
  const onApprove = async(data) => {
     // Order is captured on the server and the response is returned to the browser
     return await fetch("http://localhost:5001/api/orders/capture", {
      method: "POST",
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    })
    .then((response)=>{
      console.log("success");
      return response.json();
  }).then((data)=>console.log(data))
  };
  const initialOptions = {
    clientId: "AWDr92CAASOG4YBoYiYLGm-DHZ7wA106UEcRfrjx57mmBr79yoJxbEGWCXAOXHZumWo-vIH2LtxMmYkC",
    currency: "USD",
    intent: "capture",
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      />
      </PayPalScriptProvider>
  );
}