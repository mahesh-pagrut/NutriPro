import React from "react";
import nutrition from "../assets/nutrition.png";
import nutrition1 from "../assets/nutrition1.png";

const Nutrition = () => {
  return (
    <div className="bg-gradient-to-b from-white to-indigo-400">
      {/* Section 1 - The Importance of Nutritional Food */}
      <h2 className="text-3xl md:text-5xl text-center mt-16 font-bold text-violet-700 mb-8 px-4">
        The Importance of Nutritional Food
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src={nutrition}
            alt="Healthy Nutrition"
            className="w-4/5 md:w-3/4 lg:w-2/3"
          />
        </div>

        {/* Right Side - Information */}
        <div className="w-full md:w-1/2 px-4">
          <p className="text-gray-800 text-md md:text-lg leading-relaxed mb-6">
            Nutrition is crucial for maintaining health. A balanced diet provides essential nutrients like vitamins, minerals, and proteins necessary for energy and growth.
          </p>
          <p className="text-gray-800 text-md md:text-lg leading-relaxed mb-6">
            Managing calorie intake helps prevent health issues like obesity, diabetes, and deficiencies, ensuring overall well-being.
          </p>
          <p className="text-gray-800 text-md md:text-lg leading-relaxed">
            Prioritize a balanced diet to achieve a healthier lifestyle and reduce the risk of chronic diseases.
          </p>
        </div>
      </div>


      {/* Section 2 - Track to Transform */}
      <h2 className="text-3xl md:text-4xl text-center mt-16 mb-8 font-bold text-violet-700 px-4">
        Track to Transform: Why Monitoring Calories and Nutrition is Essential for Your Health
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12">
        {/* Left Side - Text */}
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 order-2 md:order-1">
          <ul className="list-disc pl-6 text-gray-800 text-md md:text-lg leading-relaxed">
            <li className="mb-6">Tracking ensures you meet your daily nutrient requirements, avoiding deficiencies.</li>
            <li className="mb-6">Helps identify unhealthy eating patterns and enables better food choices.</li>
            <li className="mb-6">Prevents overeating by creating awareness of calorie consumption.</li>
            <li className="mb-6">Supports weight management, whether you're aiming to lose, maintain, or gain.</li>
            <li className="mb-6">Boosts energy levels by ensuring a balanced intake of macronutrients.</li>
            <li className="mb-6">Reduces the risk of chronic diseases such as obesity, diabetes, and heart issues.</li>
            <li>Encourages mindfulness about what you eat, fostering long-term healthy habits.</li>
          </ul>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2 mr-0">
          <img
            src={nutrition1}
            alt="Track Nutrition"
            className="w-4/5 md:w-3/4 lg:w-2/3"
          />
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
