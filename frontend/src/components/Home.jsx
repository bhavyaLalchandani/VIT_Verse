/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestPositions from "./LatestPositions";
import Footer from "./shared/Footer";
import useGetAllPositions from "@/hooks/useGetAllPositions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllPositions();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.userRole === "clubCoordinator") {
      navigate("/admin/clubs");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestPositions />
      <Footer />
    </div>
  );
};

export default Home;
