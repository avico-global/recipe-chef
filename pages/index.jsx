import React from "react";
import Carousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import Shorts from "@/components/Shorts";
import Categories from "@/components/Categories";
import Head from "next/head";
import Footer from "@/components/Footer";
import TrendingRecipes from "@/components/TrendingRecipes";

export default function Home() {
  return (
    <div>
      {/* Head */}
      <Head>
        <title>Recipe Picks - Discover and Share Delicious Recipes</title>
        <meta
          name="description"
          content="Discover, share, and compete with delicious recipes on Recipe Picks"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Navbar />
      <main className="container flex flex-col items-center w-full mx-auto p-5">
        <Carousel />
        <Shorts />
        <Categories />
        <TrendingRecipes />
        <Footer />
      </main>
    </div>
  );
}
