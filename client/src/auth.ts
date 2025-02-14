import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from './axios.conf';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await api.get('/users');
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, [router]);

  return { user, loading };
};
//EOF