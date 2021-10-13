import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Router from "next/router";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>🤘 Bangers Only 🤘</h1>

        <p className={styles.description}>Get started by logging in</p>
        <Image
          src="/spotify-logo.png"
          alt="Spotify Logo"
          width={100}
          height={100}
          onClick={() => Router.push("/login")}
        />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
