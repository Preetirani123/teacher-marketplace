import React, {useEffect} from 'react'
import { useHistory } from "react-router-dom";
import Nav from '../Nav/Nav'

export default function Receipt() {
  const history = useHistory();

  if (history[-1] !== "/checkout") {
    history.push("/");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  //Have not implemented Order Number yet. Waiting to see what Vineet did.
  return (
    <div>
      <Nav />
      <h1>Thank you for your Order.</h1>
      <h2>Your Order Number is: {/* ORDER NUMBER WOULD GO HERE*/}</h2>
      <h2>You will be recieving a confirmation email shortly </h2>
      <h2>with a receipt and as well your product which you have purchased.</h2>
      <h4>You be redirected back to the home page in 5 seconds.</h4>
    </div>
  );
}
