const errorHandler = (error, request, response, next) => {
  if (error.name === "Unauthorized") {
    response.status(401).json({ message: error.message });
  } else if (error.name === "Forbidden") {
    response.status(403).json({ message: error.message });
  } else if (error.name === "SequelizeValidationError") {
    response
      .status(400)
      .json({ message: error.errors.map((err) => err.message) });
  } else if (error.name === "notFound") {
    response.status(404).json({ message: error.message });
  } else if (error.name === "emailRequire") {
    response.status(400).json({ message: error.message });
  } else if (error.name === "passwordRequire") {
    response.status(400).json({ message: error.message });
  } else if (
    error.name === "invalidLogin" ||
    error.name === "JsonWebTokenError"
  ) {
    response.status(401).json({ message: error.message });
  } else if (error.name === "uploadFailed") {
    response.status(400).json({ message: error.message });
  } else {
    response.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  errorHandler,
};
