import Head from 'next/head';
import Navbar from '../components/Navbar.js';
import DoctorsForm from '../components/forms/DoctorsForm.js';
import Redirect from '../components/cards/Redirect.js';
import useSession from '../components/hooks/useSession.js';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Doctors() {
  const router = useRouter();
  const { getItem } = useSession();

  useEffect(() => {
    setTimeout(() => {
      if (!getItem('address')) router.push('/');
    }, 3000);
  }, []);
  return (
    <>
      <Head>
        <title>Doctors</title>
      </Head>
      <Navbar />
      {getItem('address') ? <DoctorsForm /> : <Redirect />}
      {/* <DoctorsData /> */}
    </>
  );
}
