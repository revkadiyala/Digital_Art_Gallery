import React from "react";
import Header from "../../components/Header";
import Banner from "../../components/Home/banner";
import Scnd from "../../components/Home/scnd";
import Thirdsec from "../../components/Home/thirdsec";
import About from "../../components/Home/about";
import Testimonial from "../../components/Home/testimonial";

export default function HomePage() {
  return (
    <>
      <Header />
      <Banner />
      <Scnd />

      <Thirdsec />
      <Testimonial />
      <About />
    </>
  );
}
