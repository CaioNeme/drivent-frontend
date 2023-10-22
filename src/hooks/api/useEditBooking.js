import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi.js';

export default function useEditBooking() {
  const token = useToken();

  const {
    loading: editBookingLoading,
    error: editBookingError,
    act: editBooking,
  } = useAsync((data, id) => bookingApi.edit(data, id, token), false);

  return {
    editBookingLoading,
    editBookingError,
    editBooking,
  };
}
