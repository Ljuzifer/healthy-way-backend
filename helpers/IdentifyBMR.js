const IdentifyBMR = ({ gender, age, height, weigth, activityRatio }) => {
    const BMR =
        gender === "Male"
            ? (88.362 + 13.397 * weigth + 4.799 * height - 5.677 * age) * activityRatio
            : (447.593 + 9.247 * weigth + 3.098 * height - 4.33 * age) * activityRatio;

    return Math.round(BMR);
};

module.exports = IdentifyBMR;
