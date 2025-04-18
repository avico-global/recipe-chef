import React from "react";
import Carousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import Shorts from "@/components/Shorts";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import TrendingRecipes from "@/components/TrendingRecipes";
import Top10List from "@/components/Top10List";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <Navbar />
      <main className="container flex flex-col items-center w-full mx-auto p-5">
        <Carousel />
        <Categories />
        {/* <Top10List /> */}
        <Shorts />
        <TrendingRecipes />
        <Footer />
      </main>
    </div>
  );
}
