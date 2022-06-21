import { useState, useEffect } from 'react';
import useSession from '../hooks/useSession.js';
import styles from '../../styles/cards.module.css';
import GetData from './GetData.js';

export default function Metamask() {
  const [Address, setAddress] = useState('');

  const { setItem, getItem, removeItem } = useSession();
  const { load, getCurrentAccount } = GetData();

  useEffect(() => {
    if (getItem('address') && ethereum.isConnected() == false) {
      console.log(ethereum.isConnected());
      setAddress(null);
      removeItem('address');
    } else if (getItem('address')) setAddress(getItem('address'));
  }, []);

  useEffect(() => {
    // if (Address != null) setItem('address', Address);
  }, [Address]);

  // Button handler button for handling a request event for metamask
  const handle = async () => {
    await load();
    const update = async (add) => {
      const address = await getCurrentAccount();
      if (address == '' || address == undefined) {
        return;
      }
      setTimeout(() => {
        setAddress(address);
        setItem('address', address);
      }, 1000);
    };
    await update(getCurrentAccount());
  };

  const removeSession = () => {
    removeItem('address');
    setAddress(null);
  };

  return (
    <>
      <div className={styles.card} style={{ 'box-shadow': 'none' }}>
        {/* <h2>Metamask</h2> */}
        {Address == '' || Address == undefined ? (
          <>
            <h4 style={{ 'text-align': 'center' }}>Connect Metamask Account</h4>
            <button onClick={handle}>Connect</button>
          </>
        ) : (
          <>
            <br />
            <h4 style={{ 'text-align': 'center' }}>Connected</h4>
            <br />
            <button onClick={removeSession}>Reset</button>
          </>
        )}
      </div>
    </>
  );
}
