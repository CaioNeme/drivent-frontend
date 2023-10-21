import useAsync from '../useAsync';

import * as hotelApi from '../../services/hotelApi.js';
import useToken from '../useToken.js';

export default function useHotelWithRooms() {
  const token = useToken();
  const {
    data: hotelWithRooms,
    loading: hotelWithRoomsLoading,
    error: hotelWithRoomsError,
    act: getHotelWithRooms,
  } = useAsync((data) => hotelApi.getHotelWithRooms(data, token), false);

  return {
    hotelWithRooms,
    hotelWithRoomsLoading,
    hotelWithRoomsError,
    getHotelWithRooms,
  };
}
