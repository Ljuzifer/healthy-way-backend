const MethodWrapper = (operation) => {
    const method = async (req, res, next) => {
        try {
            await operation(req, res, next);
        } catch (error) {
            next(error);
        }
    };

    return method;
};

module.exports = MethodWrapper;
