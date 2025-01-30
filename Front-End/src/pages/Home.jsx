import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import hero1 from "../assets/hero1.png"; // Only using hero1
import Nutrition from "../components/Nutrition";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="min-h-screen flex flex-col justify-between items-center relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero1})`,
          backgroundPosition: "center right 15%", // Center background image for all screens
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute bottom-8 w-full px-6 sm:px-12 lg:px-16 lg:mb-40 lg:w-auto lg:bottom-20 lg:left-10 flex flex-col justify-center items-center sm:items-start text-center lg:text-left">
          {/* Title and Buttons Container */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 sm:bg-transparent sm:backdrop-blur-none w-full ">
            {/* Title Section */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white sm:text-violet-600 mb-6 ">
              "Get Expert Nutrition Advice
              <br /> from Our AI Specialist!"
            </h1>

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center sm:justify-start lg:ml-20 ">
              <button
                className="px-8 py-3 text-lg font-medium rounded-lg bg-white text-violet-700 sm:bg-white sm:text-violet-700 lg:bg-violet-700 lg:text-white shadow-md flex items-center justify-center gap-2 hover:bg-violet-800 transition duration-500 hover:shadow-zinc-600"
                onClick={() => navigate("/ai-with-text")}
              >
                <FaRobot className="sm:text-violet-700 lg:text-white" /> Text to
                Response
              </button>
              <button
                className="px-8 py-3 text-lg font-medium rounded-lg bg-white text-violet-700 sm:bg-white sm:text-violet-700 lg:bg-violet-700 lg:text-white shadow-md flex items-center justify-center gap-2 hover:bg-violet-800 transition duration-500 hover:shadow-zinc-600"
                onClick={() => navigate("/ai-with-image")}
              >
                <FaRobot className="sm:text-violet-700 lg:text-white" /> Image
                to Response
              </button>
            </div>
          </div>
        </div>
      </div>

      <Nutrition />
    </div>
  );
};

export default HomePage;
