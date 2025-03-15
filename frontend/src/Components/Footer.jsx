import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-[#343434] text-white py-10 mt-auto w-full"
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">NextGen</h2>
          <p className="text-gray-400 mt-2">Innovative & Sustainable Construction Solutions</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 text-2xl">
          <a href="#" className="hover:text-yellow-400 transition duration-300"><FaFacebook /></a>
          <a href="#" className="hover:text-yellow-400 transition duration-300"><FaTwitter /></a>
          <a href="#" className="hover:text-yellow-400 transition duration-300"><FaInstagram /></a>
          <a href="#" className="hover:text-yellow-400 transition duration-300"><FaLinkedin /></a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 mt-6 md:mt-0 text-sm text-center md:text-right">
          © {new Date().getFullYear()} NextGen. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
