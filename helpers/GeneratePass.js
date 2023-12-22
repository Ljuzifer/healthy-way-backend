function GenerateRandomPassword(length) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomString += chars.charAt(randomIndex);
    }

    return randomString;
}

module.exports = GenerateRandomPassword;
