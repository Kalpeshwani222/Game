const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("../db/init_redis");
// const { verifyRefreshToken } = require("../helpers/jwt_helper");

//verify access Token (middlware)
const VerifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(createError.Unauthorized());
  }

  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return next(createError.Unauthorized());
      } else {
        return next(createError.Unauthorized(err.message));
      }
    }
    //   req.payload = payload;
    req.user = payload.aud;
    next();
  });
};

// const verifyRefreshToken = (refreshToken) => {
//   return new Promise((resolve, reject) => {
//     JWT.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN_SECRET,
//       async (err, payload) => {
//         if (err) return reject(createError.Unauthorized());
//         const userId = payload.aud;

//         //search the key in the redis
//         const result = await client.get(userId);
//         if (refreshToken === result) return resolve(userId);
//         reject(createError.Unauthorized());
//         //end redis code
//       }
//     );
//   });
// };
module.exports = { VerifyAccessToken };
