export default function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(err.statusCode || 500).json({ error: err.message });
}
