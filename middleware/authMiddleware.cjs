const jwt = require("jsonwebtoken");
const authModel = require("../models/authSchema.cjs");

const authMiddleware = async (req, res, next) => {
  const headers = req.headers;
  if (!headers) {
    return res.status(401).json({ message: "No headers found" });
  }
  const token = headers.authorization;
  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.id = decode.id;
    const user = await authModel.findById(req.id);
    console.log(req)

    if (user) {
      next();
      
    } else {
      return res.status(401).json({ message: "Unauthorised Access" });
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = authMiddleware;
