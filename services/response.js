export const response = ({ res, status_code, success, error, data }) => {
  res.status(status_code).json({
    success,
    data,
    error,
  })
}
