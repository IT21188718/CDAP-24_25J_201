import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import AboutUs from "./Pages/Aboutus";
import Footer from "./Components/Footer";
import SolarPanel from "./Pages/SolarPanelRecommend";
import CostEstimation from "./Pages/CostEstimation";
import Recommendations from "./Pages/Recommendations";


function App() {
  return (
    <div className="overflow-x-hidden">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solar" element={<SolarPanel/>}/>
          <Route path="/cost-estimation" element={<CostEstimation />} />
          <Route path="/solar-recommend" element={<Recommendations/>}/>
          <Route path="/about" element={<AboutUs/>} /> {/* Fixed case */}
          <Route path="/contact" element={<ContactUs />} /> {/* Fixed case */}
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
