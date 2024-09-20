
import { HomePageCards } from "./components/cards/HomePageCards";
import Footer from "./components/footer/footer";
import LoginBtn from "./components/header/LoginBtn";

import Navbar from "./components/header/Navbar";
import HeroSection from "./components/hero-section/HeroSection";

export default function Home() {
  return (
    <>
    <div>
      <Navbar/>
      <HeroSection/>
      <HomePageCards/>
      <Footer/>
    </div>
    </>
    
  );
}
