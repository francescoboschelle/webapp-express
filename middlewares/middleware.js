export function errorHandler(err, req, res, next) {
  res.status(500).json({
    error: true,
    message: err.message,
  });
}

export function routeNotFound(req, res, next) {
  res.status(404).json({
    error: true,
    message: "Not found",
  });
}
