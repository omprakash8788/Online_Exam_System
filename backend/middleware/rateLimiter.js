const rateLimitStore = {};

export const RateLimiter = (req, res, next) => {
  const userId = req.ip || req.headers["x-forwarded-for"];
  const currentTime = Date.now();
  const timeWindow = 60 * 1000;
  const requestLimit = 10;
  if (!rateLimitStore[userId]) {
    rateLimitStore[userId] = [];
  }

  rateLimitStore[userId] = rateLimitStore[userId].filter(
    (timestamp) => currentTime - timestamp < timeWindow
  );

  if (rateLimitStore[userId].length >= requestLimit) {
    return res.status(429).json({
      message: "Too many requests, please try again later",
    });
  }
  rateLimitStore[userId].push(currentTime);
  next();
};
