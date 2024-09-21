import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User Not Authenticated",
        success: false,
      });
    }

    // if token exists decode and verify
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "You are Not Authenticated to edit Profile",
        success: false,
      });
    }

    req.id = decode.userId;
    next(); // if all works, sent to next route
  } catch (error) {
    console.log("An Error Occured");
  }
};

export default isAuthenticated;
