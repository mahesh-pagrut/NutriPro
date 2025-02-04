import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getBase64 } from "../helpers/image-Helper";
import robo1 from "../assets/robo1.mp4"; // Import the MP4 file

const AiwithImage = () => {
  const genAI = new GoogleGenerativeAI("AIzaSyBVGsZc-vdZuU9zS6dculPS0ZFh0905k2c");

  const [image, setImage] = useState(null);
  const [imageInlineData, setImageInlineData] = useState("");
  const [aiResponse, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const processNutritionData = (responseText) => {
    const nutritionData = [];
    const lines = responseText.split("\n");

    lines.forEach((line) => {
      if (
        line.includes("Calories") ||
        line.includes("Protein") ||
        line.includes("Fat") ||
        line.includes("Carbohydrates") ||
        line.includes("Fiber") ||
        line.includes("Sugar") ||
        line.includes("Vitamins") ||
        line.includes("Minerals") ||
        line.includes("Sodium") ||
        line.includes("Water")
      ) {
        const columns = line.split(":");
        nutritionData.push({ nutrient: columns[0].trim(), value: columns[1]?.trim() });
      }
    });

    return nutritionData;
  };

  const extractDetailedParagraph = (responseText) => {
    const paragraphStartIndex = responseText.indexOf("Detailed Analysis:");
    if (paragraphStartIndex !== -1) {
      return responseText.slice(paragraphStartIndex).trim();
    }
    return "No detailed analysis available for this food.";
  };

  const aiImageRun = async () => {
    setLoading(true);
    setResponse(null);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analyze the provided food image and:
      1. Identify the food type (e.g., idli-sambar, dosa, pizza, fruits, fast food, etc.).
      2. Provide a nutritional table with at least 10 nutrients for the identified food item, including:
         - Calories
         - Protein
         - Fat
         - Carbohydrates
         - Fiber
         - Sugar
         - Vitamins
         - Minerals
         - Sodium
         - Water
      3. Write a detailed paragraph about this food, including:
         - Food category (traditional dish, fast food, snack, etc.).
         - Nutritional benefits for weight loss, weight gain, or health.
         - How this food is typically consumed or used in meals or diets.
         - Fun facts or trivia about the food.
      If the image is unclear or the food is unrecognizable, provide suggestions for re-uploading a clearer image.`;

    try {
      const result = await model.generateContent([prompt, imageInlineData]);
      const response = await result.response;
      const text = await response.text();

      const nutritionData = processNutritionData(text);
      const detailedParagraph = extractDetailedParagraph(text);
      setResponse({ nutritionData, detailedParagraph });
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    getBase64(file)
      .then((result) => setImage(result))
      .catch((e) => console.log(e));

    fileToGenerativePart(file).then((image) => setImageInlineData(image));
  };

  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

    return { inlineData: { data: await base64EncodedDataPromise, mimeType: file.type } };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-500 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl px-4 mt-10 gap-6 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4 shadow-md bg-white border border-violet-200 rounded-md">
          <h2 className="text-lg font-semibold text-violet-700 mb-4">Analyze Image</h2>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full mb-4 p-2 text-violet-700 border border-violet-300 rounded-md"
          />
          <button
            className={`w-full px-4 py-2 bg-violet-600 text-white font-medium rounded-md shadow-md hover:bg-violet-700 ${
              loading || !image ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={aiImageRun}
            disabled={loading || !image}
          >
            {loading ? "Processing..." : "Analyze Image"}
          </button>

          {image && (
            <img
              src={image}
              className="w-full mt-4 rounded-md border border-violet-300 shadow-sm"
              alt="Uploaded Preview"
            />
          )}
        </div>

        <div className="w-full md:w-1/2 p-4 shadow-md bg-white border border-violet-200 rounded-md">
          <h2 className="text-lg font-semibold text-violet-700 mb-4">AI Response</h2>

          {loading && !aiResponse && (
            <div className="flex items-center justify-center h-60 p-4">
              <video src={robo1} autoPlay loop muted className="w-42 h-42" />
            </div>
          )}

          {aiResponse && (
            <>
              <h3 className="text-md font-medium text-violet-600 mb-3">Nutritional Information:</h3>
              <table className="table-auto w-full border-collapse mb-4">
                <thead>
                  <tr>
                    <th className="border p-2 text-left text-violet-600">Nutrient</th>
                    <th className="border p-2 text-left text-violet-600">Value per 100g</th>
                  </tr>
                </thead>
                <tbody>
                  {aiResponse.nutritionData.length > 0 ? (
                    aiResponse.nutritionData.map((row, index) => (
                      <tr key={index}>
                        <td className="border p-2 text-gray-700">{row.nutrient}</td>
                        <td className="border p-2 text-gray-700">{row.value}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="border p-2 text-center text-gray-500">
                        No nutritional data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <h3 className="text-md font-medium text-violet-600 mb-2">Detailed Analysis:</h3>
              <p className="text-gray-700">{aiResponse.detailedParagraph}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AiwithImage;