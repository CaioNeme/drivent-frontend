import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activitiesApi from '../../services/activitiesApi';

export default function useActivities(dayId, placeId) {
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivities,
  } = useAsync(() => activitiesApi.getActivities(token, dayId, placeId));

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivities,
  };
}
