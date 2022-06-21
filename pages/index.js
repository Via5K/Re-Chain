import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Welcome from '../components/cards/Welcome.js';
import Metamask from '../components/scripts/Metamask.js';
import Navbar from '../components/Navbar.js';
import Modal from '../components/cards/Modal';
import { useState } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <Welcome />
      </div>
      <div>
        {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            Hello from the modal!
          </Modal>
        )}
      </div>
      <Metamask />
    </>
  );
}
