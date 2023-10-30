import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useUserActivities() {
  const token = useToken();

  const {
    data: userActivitiesData,
    loading: userActivitiesLoading,
    error: userActivitiesError,
    act: getUserActivities
  } = useAsync(() => activitiesApi.getUserActivities(token));

  return {
    userActivitiesData,
    userActivitiesLoading,
    userActivitiesError,
    getUserActivities
  };
}
