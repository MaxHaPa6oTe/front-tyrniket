import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

function useAuthenticatedFetch() {
  const { data: session, status } = useSession();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.backendTokens?.accessToken) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [session, status]);

  const authenticatedAxiosPost = async (url, data) => {
    if (!isReady) {
      throw new Error('Not authenticated');
    }

    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${session?.backendTokens?.accessToken}`,
      },
    });
  };

  return {
    isReady,
    authenticatedAxiosPost,
  };
}

export default useAuthenticatedFetch;