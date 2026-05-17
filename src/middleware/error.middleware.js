import logger from "../util/logger.js";

const globalErrorHandler = (
    err,
    req,
    res,
    next
) => {

    logger.error(err);

    return res.status(
        err.statusCode || 500
    ).json({
        success: false,
        message:
            err.message ||
            "Internal Server Error"
    });
};

export default globalErrorHandler;