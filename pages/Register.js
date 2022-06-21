import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import PatientRegistrationForm from '../components/forms/PatientRegistrationForm.js';
import DoctorRegistrationForm from '../components/forms/DoctorRegistrationForm.js';
import Redirect from '../components/cards/Redirect.js';
import useSession from '../components/hooks/useSession.js';
import { useRouter } from 'next/router';
import styles from '../styles/cards.module.css';

export default function Register() {
  const [Form, setForm] = useState(true);

  const router = useRouter();
  const { getItem } = useSession();

  useEffect(() => {
    setTimeout(() => {
      if (!getItem('address')) router.push('/');
    }, 3000);
  }, []);

  const patientForm = () => setForm(true);
  const doctorForm = () => setForm(false);

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Navbar />
      {/* <div className={`${styles.card}`}> */}
      <div>
        <div className={`${styles.row}`}>
          <button onClick={patientForm}>Patient</button>
          <button onClick={doctorForm}>Doctor</button>
        </div>
      </div>
      {getItem('address') ? (
        <>
          {Form === true ? (
            <PatientRegistrationForm />
          ) : (
            <DoctorRegistrationForm />
          )}
        </>
      ) : (
        <Redirect />
      )}
    </>
  );
}
