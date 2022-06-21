import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Forms.module.css';
import cardStyles from '../styles/cards.module.css';
import Admin from '../components/scripts/Admin.js';
import Navbar from '../components/Navbar.js';
import Redirect from '../components/cards/Redirect.js';
import useSession from '../components/hooks/useSession.js';
import { useRouter } from 'next/router';

const AdminPanel = () => {
  const [Address, setAddress] = useState('');
  const { addAuthentication, removeAuthentication } = Admin();
  const { getItem } = useSession();

  const addressRef = useRef();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    return true;
  };

  const add = async (e) => {
    e.preventDefault();
    await addAuthentication(addressRef.current.value);
    return true;
  };

  const remove = async (e) => {
    e.preventDefault();
    await removeAuthentication(addressRef.current.value);
    return true;
  };

  useEffect(() => {
    setTimeout(() => {
      if (!getItem('address')) router.push('/');
    }, 3000);
  }, []);

  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <Navbar />
      {getItem('address') ? (
        <form className={styles.form}>
          <h2>Admin Panel</h2>
          <input
            type="text"
            placeholder="Doctor's Account Address"
            ref={addressRef}
            required
          />

          <div className={cardStyles.row}>
            <button type="submit" className={styles.btn} onClick={add}>
              Authorize
            </button>
            <button type="submit" className={styles.btn} onClick={remove}>
              Unauthorize
            </button>
          </div>
        </form>
      ) : (
        <Redirect />
      )}
    </>
  );
};

export default AdminPanel;
