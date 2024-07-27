import React from "react";
import HomeSection from "@/components/custom/home-section";

const Home = () => {
  return (
    <div className="py-2 flex flex-col gap-3">
      <HomeSection title="Antreman Programları" />
      <HomeSection title="Yemek Tarifleri" reverse />
      <HomeSection title="Makaleler" />
    </div>
  );
};

export default Home;
