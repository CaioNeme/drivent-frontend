import { createContext, useState } from 'react';

const PaymentContext = createContext();
export default PaymentContext;

export function PaymentProvider({ children }) {
  const [priceTicket, setPriceTicket] = useState(0);
  const [typeTicket, setTypeTicket] = useState('');
  const [hotelTicket, setHotelTicket] = useState(false);

  return (
    <PaymentContext.Provider
      value={{ priceTicket, setPriceTicket, typeTicket, setTypeTicket, hotelTicket, setHotelTicket }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
