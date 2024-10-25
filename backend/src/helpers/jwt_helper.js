const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("../db/init_redis");
module.exports = {
  //generating the at the register & login Time
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};

      const secret = process.env.ACCESS_TOKEN_SECRET;

      const options = {
        expiresIn: "1h", //15s 1h
        issuer: "kalpeshwani.com",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);

          // reject(err)
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  // //verify access Token (middlware)
  // VerifyAccessToken: (req, res, next) => {
  //   if (!req.headers["authorization"]) {
  //     return next(createError.Unauthorized());
  //   }

  //   const authHeader = req.headers["authorization"];
  //   const bearerToken = authHeader.split(" ");
  //   const token = bearerToken[1];

  //   JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
  //     if (err) {
  //       if (err.name === "JsonWebTokenError") {
  //         return next(createError.Unauthorized());
  //       } else {
  //         return next(createError.Unauthorized(err.message));
  //       }
  //     }
  //     //   req.payload = payload;
  //     req.user = payload.aud;
  //     next();
  //   });
  // },

  //generate the refresh token
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "pickurpage.com",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          // reject(err)
          reject(createError.InternalServerError());
        }
        //seeting the refresh token to the redis
        // client.SET(userId, token, "EX", 365 * 24 * 60 * 60);

        // client.set(userId, token, "EX", 60);
        client.set(userId, token);
        client.expire(userId, 365 * 24 * 60 * 60);
        resolve(token);
      });
    });
  },

  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const userId = payload.aud;

          //search the key in the redis
          const result = await client.get(userId);
          if (refreshToken === result) return resolve(userId);
          reject(createError.Unauthorized());
          //end redis code
        }
      );
    });
  },
};
