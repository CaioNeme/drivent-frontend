import useAsync from '../useAsync';
import useToken from '../useToken';
import * as daysApi from '../../services/daysApi';

export default function useDays() {
  const token = useToken();

  const { data: days, loading: daysLoading, error: daysError, act: getDays } = useAsync(() => daysApi.getDays(token));

  return {
    days,
    daysLoading,
    daysError,
    getDays,
  };
}
