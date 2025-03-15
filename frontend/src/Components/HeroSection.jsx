import React from "react";
import { motion } from "framer-motion";
import worker from "../assets/worker1.png"; // Ensure the image has a transparent background
import bgImage from "../assets/bgImage.jpg";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center bg-white text-black overflow-hidden pt-24">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      ></motion.div>

      {/* Overlay for Readability */}
      <motion.div
        className="absolute inset-0 bg-black opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      ></motion.div>

      {/* Content Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-wrap items-center justify-center md:justify-between min-h-screen"
      >
        {/* Left Side - Text Content */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.p
            className="text-yellow-500 font-semibold text-lg mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            WE ARE BUILDERS
          </motion.p>
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            WE WILL BUILD YOUR DREAM
          </motion.h1>
          <motion.p
            className="text-md md:text-lg text-gray-200 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            With 25 years of experience, we bring your vision to life.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-600"
            >
              READ MORE
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500 hover:text-black"
            >
              REACH US
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Side - Worker Image */}
        <motion.div
  className="w-full md:w-1/2 flex justify-center md:justify-end items-center mt-8 md:mt-0"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 2.5 }}
>
  <motion.img
    src={worker}
    alt="Construction Worker"
    className="max-w-md md:max-w-xl lg:max-w-3xl h-auto object-contain scale-110 md:scale-125"
    animate={{
      y: [0, -10, 0], // Floating effect
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</motion.div>

      </motion.div>
    </div>
  );
};

export default HeroSection;
