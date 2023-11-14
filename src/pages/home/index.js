'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const Home= () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);
  return <></>
};
