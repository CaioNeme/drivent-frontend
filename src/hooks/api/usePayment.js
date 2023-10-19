import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePayment() {
  const token = useToken();
  
  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: getpayment
  } = useAsync(() => paymentApi.getPaymentInformation(token));

  return {
    payment,
    paymentLoading,
    paymentError,
    getpayment
  };
}
