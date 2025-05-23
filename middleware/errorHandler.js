const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    // Handle specific errors
    if (err.name === "ValidationError") {
      res.status(400);
      res.json({
        message: "Validation Error",
        details: err.errors,
      });
    } else if (err.name === "CastError") {
      res.status(400);
      res.json({
        message: "Invalid ID format",
      });
    } else {
      // Generic error handler
      res.status(statusCode).json({
        message: err.message || "Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
    }
  };
  
  module.exports = errorHandler;
  