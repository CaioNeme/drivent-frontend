import useAsync from '../useAsync';

import * as hotelApi from '../../services/hotelApi.js';
import useToken from '../useToken.js';

export default function useHotels() {
  const token = useToken();
  const {
    data: hotels,
    loading: hotelLoading,
    error: hotelError,
    act: getHotel,
  } = useAsync(() => hotelApi.getHotels(token));

  return {
    hotels,
    hotelLoading,
    hotelError,
    getHotel,
  };
}
