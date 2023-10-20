import useAsync from '../useAsync';

import * as hotelApi from '../../services/hotelApi.js';
import useToken from '../useToken.js';

export default function useHotelWithRooms(id) {
  const token = useToken();
  const {
    data: hotelWithRooms,
    loading: hotelWithRoomsLoading,
    error: hotelWithRoomsError,
    act: getHotelWithRooms,
  } = useAsync(() => hotelApi.getHotelWithRooms(id, token));

  return {
    hotelWithRooms,
    hotelWithRoomsLoading,
    hotelWithRoomsError,
    getHotelWithRooms,
  };
}
