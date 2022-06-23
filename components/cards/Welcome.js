import styles from '../../styles/cards.module.css';

export default function Welcome() {
  return (
    <>
      <div className={styles.card}>
        <h1 className={styles.head}>Re-Chain</h1>
        <br />
        <p>
          Is a decentralised medical record storage system which used the
          secureity of Blockchain and deployed on Ethereum Blockchain. Many A
          times, Medical Records get misplaced, Although they are very
          important. So, Re-chain is one stop solutions to all hassle for
          keeping safe your Medical Records.
        </p>
        <br />
        <p>
          To Know How to Use It:
          <a href="https://github.com/Via5k/Re-Chain">Click Here</a>
        </p>
        <br />
      </div>
    </>
  );
}
