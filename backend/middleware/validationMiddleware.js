const { validationResult } = require('express-validator');

/**
 * Validation Error Handler Middleware
 * 
 * Checks for validation errors from express-validator and returns a 400 response
 * with error details if validation fails. Otherwise, proceeds to the next middleware.
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { handleValidationErrors };