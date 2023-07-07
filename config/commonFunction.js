const responseError = (res, error) => {
  return res.status(500).json({
    data: null,
    status: false,
    message: error.message || "Internal Server Error",
  });
};

module.exports = { responseError };
