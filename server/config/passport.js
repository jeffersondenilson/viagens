const passportJwt = require("passport-jwt");
const { Strategy, ExtractJwt } = passportJwt;

const User = require("../models/user");

module.exports = (passport) => {
  const opts = {
    secretOrKey: process.env.AUTH_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id).exec();

      if (user) {
        done(null, { ...payload });
      } else {
        done(null, false);
      }
    } catch (e) {
      console.error(e);
      done(e, false);
    }
  });

  passport.use(strategy);
};
