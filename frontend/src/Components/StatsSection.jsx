import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import workers from "../assets/workers.jpg"; // Replace with your actual image path

const StatsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-white"
    >
      {/* Left Side - Text Content */}
      <motion.div
        className="md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
          We’re on a mission to accelerate the adoption of solar and renewable energy globally
        </h2>

        {/* Stats Grid with CountUp Animation */}
        <motion.div
          className="grid grid-cols-2 gap-6 md:gap-8 mt-8 text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {[
            { end: 2500, text: "Active solar professionals", suffix: "+" },
            { end: 100, text: "Partners and providers", suffix: "+" },
            { end: 16, text: "Countries", suffix: "+" },
            { end: 100, text: "Quality of works", suffix: "%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-3xl font-bold">
                <CountUp start={0} end={stat.end} duration={3} separator="," suffix={stat.suffix} />
              </p>
              <p className="text-lg text-gray-600">{stat.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Link */}
        <motion.a
          href="#"
          className="text-blue-600 text-lg font-semibold mt-6 inline-block"
          whileHover={{ scale: 1.1, color: "#1D4ED8" }}
          transition={{ duration: 0.3 }}
        >
          Learn why OpenSolar is free &gt;
        </motion.a>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        className="md:w-1/2 flex justify-center mt-10 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.img
          src={workers}
          alt="Family with Solar Panels"
          className="rounded-xl w-full max-w-md md:max-w-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default StatsSection;
