const passportJwt = require("passport-jwt");
const { Strategy, ExtractJwt } = passportJwt;

// database

module.exports = (passport) => {
  const opts = {
    secretOrKey: process.env.AUTH_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(opts, async (payload, done) => {
    try {
      // search user on database
      // const user = await User.findByPk(payload.id);

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
