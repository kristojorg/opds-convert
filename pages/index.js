import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>OPDS 1 Converter</title>
        <meta name="description" content="Convert OPDS 1 to OPDS 2." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">OPDS Convert!</a>
        </h1>

        <p className={styles.description}>
          To convert a document fetch:
          <code className={styles.code}>api/[opds1Url]</code>. The URL can be to
          either an OPDS Entry or a Feed; it will be automatically detected.
        </p>
      </main>
    </div>
  );
}
