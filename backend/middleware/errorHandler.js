import { HttpError } from '../utils/HttpErrors.js';
 
export function notFound(req, res, next) {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}
 
export function errorHandler(err, req, res, next) {
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      error: { message: 'A student with this email already exists' },
    });
  }
 
  if (err.status && err.status < 500) {
    return res.status(err.status).json({
      error: { message: err.message, details: err.details },
    });
  }
 
  console.error(err);
  res.status(500).json({
    error: { message: 'Something went wrong on the server' },
  });
}