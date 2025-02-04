import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const CalorieIntake = () => {
  const [calorieNeeds, setCalorieNeeds] = useState("");
  const [qrData, setQrData] = useState("");
  const [tips, setTips] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (calorieNeeds || tips || qrData) {
      setQrData(""); // Reset QR data if form is cleared
      setTips(""); // Reset tips when new calculation is made
    }
  }, [calorieNeeds, tips, qrData]);

  const handleCalculate = (event) => {
    event.preventDefault();

    const age = parseInt(event.target.age.value, 10);
    const weight = parseFloat(event.target.weight.value);
    const height = parseFloat(event.target.height.value);
    const activityLevel = event.target.activityLevel.value;
    const gender = event.target.gender.value;

    if (age <= 0 || weight <= 0 || height <= 0) {
      setError("Age, weight, and height must be positive values.");
      return;
    }
    setError(""); // Reset error message

    // Calculate BMR
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      super_active: 1.9,
    };

    const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

    // Age-based tips
    let ageTips = "";
    if (age < 18) {
      ageTips = "Focus on balanced meals rich in proteins, fruits, and vegetables to support growth.";
    } else if (age <= 30) {
      ageTips = "Maintain an active lifestyle and include whole grains, lean proteins, and healthy fats.";
    } else if (age <= 50) {
      ageTips = "Keep an eye on portion sizes and prioritize nutrient-dense foods.";
    } else {
      ageTips = "Incorporate calcium-rich foods and stay hydrated to support bone health.";
    }

    setCalorieNeeds(tdee);
    setTips(ageTips);

    // Generate QR data
    setQrData(
      `Age: ${age}\nWeight: ${weight} kg\nHeight: ${height} cm\nActivity Level: ${activityLevel}\nDaily Calorie Needs: ${tdee} kcal\nTips: ${ageTips}`
    );

    event.target.reset();
  };

  return (
    <div className="mx-auto p-6 md:p-12 flex flex-col items-center bg-gradient-to-b from-white to-violet-300">
      <h1 className="text-5xl font-semibold mb-6 text-violet-800">Calories Calculator</h1>
      <p className="mb-8 text-center text-lg md:text-xl text-violet-700">
        Calculate your daily calorie needs and get useful health tips.
      </p>

      <form
        onSubmit={handleCalculate}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl space-y-6 border border-violet-200"
      >
        <div className="mb-4">
          <label htmlFor="gender" className="block text-violet-700 text-lg">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            className="mt-1 block w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-violet-700 text-lg">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="mt-1 block w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
            min="1"
            max="120"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="weight" className="block text-violet-700 text-lg">
            Weight (kg):
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            className="mt-1 block w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
            min="1"
            max="500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="height" className="block text-violet-700 text-lg">
            Height (cm):
          </label>
          <input
            type="number"
            id="height"
            name="height"
            className="mt-1 block w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
            min="50"
            max="250"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="activityLevel" className="block text-violet-700 text-lg">
            Activity Level:
          </label>
          <select
            id="activityLevel"
            name="activityLevel"
            className="mt-1 block w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="sedentary">Sedentary</option>
            <option value="lightly_active">Lightly Active</option>
            <option value="moderately_active">Moderately Active</option>
            <option value="very_active">Very Active</option>
            <option value="super_active">Super Active</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-violet-700 text-white py-2 px-4 rounded-lg hover:bg-violet-800 w-full text-lg"
        >
          Calculate
        </button>
      </form>

      {error && (
        <div className="mt-6 text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}

      {calorieNeeds && (
        <div className="mt-8 text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-violet-700">Your Daily Calorie Needs:</h2>
          <p className="text-xl mb-4 text-violet-600">{calorieNeeds} kcal</p>
          <p className="text-lg text-gray-700 mb-4">Tips: {tips}</p>

          <div className="flex justify-center mt-6">
            <QRCode value={qrData} size={240} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieIntake;
