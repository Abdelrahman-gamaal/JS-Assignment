export const successResponse = (
  res,
  statusCode,
  message = "done",
  data = null,
) => {
  res.status(statusCode).json({
    message,
    data,
  });
};

export const errorResponse = (res, message, statusCode) => {
  return res.status(statusCode).json({
    error: "error",
    message,
  });
};
