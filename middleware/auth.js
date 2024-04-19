const { getTokenFromHeaders, extractToken } = require("../helper/auth");
const { profile } = require("../usecase/auth");

exports.authMiddleware = (roles) => async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req?.headers);
    // extract token to get the member id
    const extractedToken = extractToken(token);

    const member = await profile(extractedToken?.id);

    if (!roles.includes(member?.role)) {
      return next({
        message: "Forbiden",
        statusCode: 403,
      });
    }
    req.member = member;
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
