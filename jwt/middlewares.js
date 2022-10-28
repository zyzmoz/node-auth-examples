export const protectedRoute = (req, res, next) => {
  const { authorization } = req;
  if (authorization) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};
