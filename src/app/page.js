"use client";
import { HomePageCards } from "./components/cards/HomePageCards";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import HeroSection from "./components/hero-section/HeroSection";
import AuthContextProvider from "./lib/contexts/AuthContext";


export default function Home() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <HeroSection />
        <HomePageCards />
        <Footer />
      </AuthContextProvider>
    </>
  );
}
