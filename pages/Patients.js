import Head from 'next/head';
import Navbar from '../components/Navbar.js';
import PatientForm from '../components/forms/PatientForm.js';
import PatientRegistrationForm from '../components/forms/PatientRegistrationForm.js';
import Redirect from '../components/cards/Redirect.js';
import useSession from '../components/hooks/useSession.js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PatientData from '../components/cards/PatientData.js';
import styles from '../styles/cards.module.css';

export default function Reports() {
  const router = useRouter();
  const { getItem } = useSession();

  const [Form, setForm] = useState(true);

  const getForm = () => setForm(true);
  const addForm = () => setForm(false);

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
      <div>
        <div
          className={`${styles.row}`}
          style={{ maxWidth: '750px', margin: '0 auto' }}
        >
          <button onClick={getForm}>Lookup Patient</button>
          <button onClick={addForm}>Add Patient</button>
        </div>
      </div>
      {getItem('address') ? (
        <>{Form === true ? <PatientForm /> : <PatientRegistrationForm />}</>
      ) : (
        <Redirect />
      )}
    </>
  );
}
