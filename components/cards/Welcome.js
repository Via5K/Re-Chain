import styles from '../../styles/cards.module.css';

export default function Welcome() {
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
        <p>
          To Know How to Use It:
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
        <br />
      </div>
    </>
  );
}
