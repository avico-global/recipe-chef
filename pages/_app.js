import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/favicon.jpeg" />
        <title>Recipe Picks - #1 Recipes Destination on the Internet.</title>
        <meta
          name="description"
          content="Recipe Picks is the Internet’s number one place for 200K+ delicious recipes. Discover, cook, and enjoy the perfect dish for every craving."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
