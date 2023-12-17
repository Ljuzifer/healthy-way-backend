const NeededWater = (weight, activity) => {
    let multiplier;

    switch (activity) {
        case 1.2:
            multiplier = 0;
            break;
        case 1.375:
            multiplier = 0.35;
            break;
        case 1.55:
            multiplier = 0.45;
            break;
        case 1.725:
            multiplier = 0.55;
            break;
        case 1.9:
            multiplier = 0.7;
            break;
        default:
            multiplier = 0;
    }

    const needed = weight * 0.03 + multiplier;

    return needed.toFixed(1);
};

module.exports = NeededWater;
