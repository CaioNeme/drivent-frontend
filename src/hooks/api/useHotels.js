import useAsync from '../useAsync';

import * as hotelApi from '../../services/hotelApi.js';
import useToken from '../useToken.js';

export default function useHotels() {
  const token = useToken();
  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
    act: getHotels,
  } = useAsync(() => hotelApi.getHotels(token), false);

  return {
    hotels,
    hotelsLoading,
    hotelsError,
    getHotels,
  };
}
