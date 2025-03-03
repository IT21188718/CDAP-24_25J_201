const recommendationModel = require("../models/recommendationModel");

const getAllRecommendations = async () => {
    const recommendations = await recommendationModel.findMany();
    return recommendations;
};

const saveRecommendationToDB = async (recommendationData) => {
    try {
        // Ensure `allowedCapacity` is set (use desiredCapacity if missing)
        const allowedCapacity = recommendationData.allowed_capacity || recommendationData.desired_capacity || null;

        // Prepare data for saving
        const data = {
            location: recommendationData.location,
            landSize: recommendationData.land_size,
            allowedCapacity: allowedCapacity,  // Ensure it's always present
            desiredCapacity: recommendationData.desired_capacity || null,
            avgEfficiency: recommendationData.avg_efficiency,
            avgPrice: recommendationData.avg_price,
            finalPrice: recommendationData.final_price,
            predictedPanels: recommendationData.predicted_panels,
            panelsFitInLand: recommendationData.panels_fit_in_land
        };

        // Save the data to the database
        const savedRecommendation = await recommendationModel.create({ data });
        console.log("Recommendation data saved:", savedRecommendation);
        return savedRecommendation;
    } catch (error) {
        console.error("Error saving recommendation to the database:", error);
        throw new Error("Failed to save recommendation to the database");
    }
};


module.exports = {
    saveRecommendationToDB,
    getAllRecommendations
};
