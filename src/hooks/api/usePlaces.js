import useAsync from '../useAsync';
import useToken from '../useToken';
import * as placesApi from '../../services/placesApi';

export default function usePlace() {
  const token = useToken();

  const {
    data: places,
    loading: placesLoading,
    error: placesError,
    act: getPlaces,
  } = useAsync(() => placesApi.getPlaces(token));

  return {
    places,
    placesLoading,
    placesError,
    getPlaces,
  };
}
