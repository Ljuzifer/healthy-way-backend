const IdentifyBMR = ({ gender, age, height, weight, activityRatio }) => {
    // const BMR =
    //     gender === "Male"
    //         ? (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) * activityRatio
    //         : (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) * activityRatio;

    // return Math.round(BMR);

    if (gender === "Male") {
        const BMR = (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) * activityRatio;
        console.log(gender, age, height, weight, activityRatio);
        return Math.round(BMR);
    }

    if (gender === "Female") {
        const BMR = (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) * activityRatio;
        return Math.round(BMR);
    }
};

module.exports = IdentifyBMR;
