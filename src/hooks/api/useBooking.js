import useAsync from '../useAsync';

import * as bookingApi from '../../services/bookingApi.js';
import useToken from '../useToken.js';

export default function useBooking() {
  const token = useToken();
  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: getBooking,
  } = useAsync(() => bookingApi.getBooking(token), false);

  return {
    booking,
    bookingLoading,
    bookingError,
    getBooking,
  };
}
