import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
          To convert a document fetch: {""}
          <code className={styles.code}>api/[opds1Url]</code>. The URL can be an
          OPDS Entry or Feed; it will be automatically detected. The URL should
          be URL Encoded.
        </p>
        <p className={styles.examples}>
          Examples:
          <ul>
            <li>
              <Link href="/api/https%3A%2F%2Fcirculation.openebooks.us%2FUSOEI%2Fworks%2FAxis%2520360%2520ID%2F0020394894">
                OPDS Entry
              </Link>
              {" -> "}
              <code className={styles.code}>
                /api/https%3A%2F%2Fcirculation.openebooks.us%2FUSOEI%2Fworks%2FAxis%2520360%2520ID%2F0020394894
              </code>
            </li>
            <li>
              <Link href="/api/https%3A%2F%2Fcirculation.openebooks.us%2FUSOEI%2Fgroups%2F2%3Fentrypoint%3DBook">
                OPDS Feed
              </Link>
              {" -> "}
              <code className={styles.code}>
                /api/https%3A%2F%2Fcirculation.openebooks.us%2FUSOEI%2Fgroups%2F2%3Fentrypoint%3DBook
              </code>
            </li>
          </ul>
        </p>
        <p className={styles.description}>
          Github Repo: {""}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/kristojorg/opds-convert"
          >
            kristojorg/opds-convert
          </a>
        </p>
      </main>
    </div>
  );
}
