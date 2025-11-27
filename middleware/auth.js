import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authheader = req.headers.authorization;
  const token = authheader?.split(" ")[1];
  console.log("token: ", token);
  if (!token) return res.status(401).json({ message: "no token privided" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET),
    (err, user) => {
      if (err) return res.status(403).json({ message: "forbidden" });
      req.user = user;
      next();
    };
};
