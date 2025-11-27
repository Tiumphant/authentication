import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const accesToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
  return { accesToken, refreshToken };
};
