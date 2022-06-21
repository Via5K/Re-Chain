import Head from 'next/head';
import Navbar from '../components/Navbar.js';
import PatientForm from '../components/forms/PatientForm.js';
import Redirect from '../components/cards/Redirect.js';
import useSession from '../components/hooks/useSession.js';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PatientData from '../components/cards/PatientData.js';

export default function Reports() {
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
        <title>Patients </title>
      </Head>
      <Navbar />
      {getItem('address') ? <PatientForm /> : <Redirect />}
      {/* <PatientData /> */}
    </>
  );
}
