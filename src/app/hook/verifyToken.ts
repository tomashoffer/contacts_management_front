import { useEffect } from 'react';
import { useVerifyTokenDataQuery } from '@/redux/services/authApi';

const useVerifyTokenAndRedirect = () => {
  const { data, error } = useVerifyTokenDataQuery();

  useEffect(() => {
    if (error) {
      window.location.href = '/login';
    } else if (data && !data.token) {
      window.location.href = '/';
    }
  }, [data, error]);

  return { data, error };
};

export default useVerifyTokenAndRedirect;
