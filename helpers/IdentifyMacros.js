const IdentifyMacros = (goal, BMR) => {
    let proteinPercentage, fatPercentage;

    switch (goal) {
        case "Lose fat":
            proteinPercentage = 0.25;
            fatPercentage = 0.2;
            break;
        case "Gain Muscle":
            proteinPercentage = 0.3;
            fatPercentage = 0.2;
            break;
        case "Maintain":
            proteinPercentage = 0.2;
            fatPercentage = 0.25;
            break;
        default:
            proteinPercentage = 0.25;
            fatPercentage = 0.2;
    }

    const carbPercentage = 1 - (proteinPercentage + fatPercentage);

    const protein = Math.round((proteinPercentage * BMR) / 4);
    const fat = Math.round((fatPercentage * BMR) / 9);
    const carbohydrate = Math.round((carbPercentage * BMR) / 4);

    // const macros = { fat, protein, carbohydrate };
    return { fat, protein, carbohydrate };
};

module.exports = IdentifyMacros;
