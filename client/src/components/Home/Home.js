import React from "react";
import "./HomeStyles.css";
import Navbar from "../Navbar/Navbar";
<Navbar />
import Hero from "../Hero/Hero";
import { MetaTags } from "react-meta-tags";
import Pricing from "../Pricing/Pricing";
import Faq from "../Faq/Faq";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div>
      <MetaTags>
        <title>Home </title>
      </MetaTags>
      <Navbar />
      <Hero />
      <Pricing />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
