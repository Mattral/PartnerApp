'use client';

import { useEffect } from 'react';

// NEXT
import { useRouter } from 'next/navigation';

// PROJECT IMPORTS
import Loader from 'components/Loader';

// TYPES
import { GuardProps } from 'types/auth';
import { useSession } from 'next-auth/react';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }: GuardProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await fetch('/api/auth/protected');
      const json = await res?.json();
      if (!json?.protected) {
        router.push('/login');
      }
    };
    fetchData();

    // eslint-disable-next-line
  }, [session]);

  if (status == 'loading' || !session?.user) return <Loader />;

  return <>{children}</>;
};

export default AuthGuard;
