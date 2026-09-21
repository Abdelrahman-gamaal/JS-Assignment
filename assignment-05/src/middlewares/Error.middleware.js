import { errorResponse } from "../utils/response.js";
export const errorMiddleware = (err, req, res, next) => {
  return errorResponse(res, err.message, err.statusCode);
};
