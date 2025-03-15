import React from "react";
import { motion } from "framer-motion";
import StatsSection from "../Components/StatsSection";
import HeroSection from "../Components/HeroSection";
import sampleVideo from "../assets/sampleVideo.mp4"; // Sample video

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Video Section */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto my-12 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Title with Animation */}
        <motion.h2
          className="text-3xl font-bold text-center text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Watch Our Work In Action
        </motion.h2>

        {/* Video Wrapper with Hover Animation */}
        <motion.div
          className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <video
            src={sampleVideo}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline // Ensures autoplay works on iOS
            poster="https://via.placeholder.com/800x450"
          ></video>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
