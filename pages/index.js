import React from "react";
import Carousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import Shorts from "@/components/Shorts";
import Categories from "@/components/Categories";
import Head from "next/head";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      {/* Head */}
      <Head>
        <title>Recipe Chef - Discover and Share Delicious Recipes</title>
        <meta
          name="description"
          content="Discover, share, and compete with delicious recipes on Recipe Chef"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Navbar />
      <main className="max-w-screen-xl flex flex-col items-center w-full mx-auto">
        <Carousel />
        <Shorts />
        <Categories />
        <Footer />
      </main>
    </div>
  );
}
