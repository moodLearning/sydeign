import { useEffect, useState } from 'react';
import { useAuth } from '../data/AuthContext';

export function useCustomerProfile() {
  const { token, isLoggedIn } = useAuth();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn || !token) {
      setName(null);
      return;
    }

    let active = true;
    const apiUrl = import.meta.env.PUBLIC_CUSTOMER_ACCOUNT_API_URL;

    fetch(`${apiUrl}/account/customer/api/2026-07/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ query: 'query { customer { firstName lastName } }' }),
    })
      .then((res) => res.json() as Promise<{ data?: { customer?: { firstName?: string; lastName?: string } } }>)
      .then((data) => {
        if (!active) return;
        const firstName = data?.data?.customer?.firstName ?? '';
        const lastName = data?.data?.customer?.lastName ?? '';
        setName(`${firstName} ${lastName}`.trim() || null);
      })
      .catch((err) => {
        console.error('Failed to load customer profile:', err);
      });

    return () => {
      active = false;
    };
  }, [token, isLoggedIn]);

  return { name };
}
