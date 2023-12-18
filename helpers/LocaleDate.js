const LocaleDate = () => {
    const currentDate = new Date();
    const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        // timeZone: "Europe/Kiev", // Вказуйте відповідно до вашого часового поясу
        // timeZoneName: "short",
    };
    const formattedDate = currentDate.toLocaleDateString("uk-UA", options);
    return formattedDate;
};
module.exports = LocaleDate;
