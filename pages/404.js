import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/404.module.css';

export default function Custom404() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.back();
    }, 4000);
  });
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <section className={styles.body}>
        <div className={styles.wrapper}>
          <img
            src="https://wallpaperaccess.com/full/3275697.jpg"
            alt=""
            onmousedown="return false;"
          />
          <h5>
            Why Bro,
            <br />
            Why did you do that....{' '}
          </h5>
          <h3>You just Hit END</h3>
          <h1> 4 4</h1>
          <a href="/">
            {/* <i className={styles.bi styles.bi-arrow-left-circle} style="padding-right:10px;">
            </i > */}
            ⬅️Let's Go Back{' '}
          </a>
        </div>
      </section>
    </>
  );
}
