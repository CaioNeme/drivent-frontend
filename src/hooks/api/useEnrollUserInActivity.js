import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useEnrollUserInActivity() {
  const token = useToken();

  const {
    loading: useEnrollUserInActivityLoading,
    error: useEnrollUserInActivityError,
    act: enrollUserInActivity
  } = useAsync((data, activityId) => activitiesApi.enrollUserInActivity(data, token, activityId), false);

  return {
    useEnrollUserInActivityLoading,
    useEnrollUserInActivityError,
    enrollUserInActivity
  };
}
