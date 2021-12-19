import React from 'react';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  return (
    <header>
      <div className="container">
        <h1 className="hero__title">Title</h1>
        <p className="hero__subtitle">subTitle</p>
        <div className={styles.buttons}>
          <a
            className="button button--secondary button--lg"
            href="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </>
  );
}
