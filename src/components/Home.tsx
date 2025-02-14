import Link from 'next/link';
import { DOCS_URL } from '@constants/index';
import styles from '@styles/Home.module.css';

function Home(): JSX.Element {
  /* eslint-disable no-console */
  console.log('%cHi There👋, Im Ajay👨‍💻', 'font-size: 25px;');
  console.log(`%cCheck out my code here: ${DOCS_URL}`, 'font-size:15px');
  console.log('%cAs long as you are winning it is a good day🎯', 'font-size: 20px;');

  return (
    <div className={styles.containers}>
      <h1 className={styles.heading}>The Next.js Progressive Web App</h1>
      <br />
      <h2 className={styles.content}>
       Facts about cats
      </h2>
      <br />
      <div className="mt-10">
       
      </div>
    </div>
  );
}

export default Home;
