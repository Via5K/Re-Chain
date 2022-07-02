import styles from '../../styles/cards.module.css';
import { useState } from 'react';
import Modal from '../cards/Modal';
import Image from 'next/image';

export default function Welcome() {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('');

  const myLoader = ({ src, width, quality }) => {
    return `${src}`;
  };

  return (
    <>
      <div className={styles.card}>
        <h1 className={styles.head}>Re-Chain</h1>
        <br />
        <p>
          Is a decentralised medical record storage system which uses the
          security of Blockchain and is deployed on Ethereum Blockchain. Many A
          times, Medical Records get misplaced, though they are very important.
          So, Re-chain is one stop solutions to all your hassle of keeping safe
          your Medical Records.
        </p>
        <br />
        <br />
        <div className={styles.head}>
          <Image
            loader={myLoader}
            src="https://o.remove.bg/downloads/e21c7a5c-a4ea-43da-a4b9-102061054e95/Square-Brackets_-Curly-Brackets_-Angle-Brackets_-Oh-My-1_720x370-removebg-preview.png"
            alt="Directions of use"
            width={120}
            height={80}
          />
        </div>
        <iframe
          height="300px"
          width={'100%'}
          src="https://b.0-0.plus/blog/md.htm?src=https://raw.githubusercontent.com/Via5K/Re-Chain/master/README.md"
          frameborder="0"
        ></iframe>
        <br />
        <iframe
          height="300px"
          width={'100%'}
          src="https://b.0-0.plus/blog/md.htm?src=https://raw.githubusercontent.com/Via5K/Blockchain-Based-Medical-Health-Records/master/README.md"
          frameborder="0"
        ></iframe>
        <br />
      </div>
      <section>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            <div style={{ fontSize: '1rem' }}>
              <div className={styles.head}>
                <p>
                  To Know How to Use It:
                  <iframe
                    height="300px"
                    width={'100%'}
                    src="https://b.0-0.plus/blog/md.htm?src=https://raw.githubusercontent.com/Via5K/Re-Chain/master/README.md"
                    frameborder="0"
                  ></iframe>
                  <iframe
                    height="300px"
                    width={'100%'}
                    src="https://b.0-0.plus/blog/md.htm?src=https://raw.githubusercontent.com/Via5K/Blockchain-Based-Medical-Health-Records/master/README.md"
                    frameborder="0"
                  ></iframe>
                  <a href="https://github.com/Via5k/Re-Chain/blob/master/README.md">
                    Click Here
                  </a>{' '}
                  <br />
                  To Know About Contracts:
                  <a href="https://github.com/Via5K/Blockchain-Based-Medical-Health-Records/blob/master/README.md">
                    {' '}
                    Click Here{' '}
                  </a>
                </p>
              </div>
            </div>
          </Modal>
        )}
      </section>
    </>
  );
}
