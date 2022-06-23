import Head from 'next/head';
import Navbar from '../components/Navbar.js';
import DoctorsForm from '../components/forms/DoctorsForm.js';
import DoctorRegistrationForm from '../components/forms/DoctorRegistrationForm.js';
import Redirect from '../components/cards/Redirect.js';
import useSession from '../components/hooks/useSession.js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/cards.module.css';

export default function Doctors() {
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
        <title>Doctors</title>
      </Head>
      <Navbar />
      <div>
        <div
          className={`${styles.row}`}
          style={{ maxWidth: '750px', margin: '0 auto' }}
        >
          <button onClick={getForm}>View Details</button>
          <button onClick={addForm}>Register</button>
        </div>
      </div>
      {getItem('address') ? (
        <>{Form === true ? <DoctorsForm /> : <DoctorRegistrationForm />}</>
      ) : (
        <Redirect />
      )}
    </>
  );
}
