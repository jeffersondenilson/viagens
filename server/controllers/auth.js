const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports = {
  async signup(req, res) {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const error = await user.validate().catch((e) => e);
      if (error) {
        const errors = Object.keys(error.errors).map((field) => {
          return { field, message: error.errors[field].message };
        });

        return res.status(400).send({
          errors,
          status: 400,
        });
      }

      const emailExists = await User.findOne({ email: user.email }).exec();
      if (emailExists) {
        return res.status(400).send({
          errors: [{ field: "email", message: "Email já existe" }],
          status: 400,
        });
      }

      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));

      await user.save();

      res.status(201).send("Conta criada, vá para signin");
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: "ERROR", status: 500 });
    }
  },

  async signin(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email }).exec();

      if (!user) {
        return res.status(400).send({
          error: "Email não encontrado",
          status: 400,
        });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).send({
          error: "Email/Senha não conferem",
          status: 401,
        });
      }

      const now = Math.floor(Date.now() / 1000); // data em segundos

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        iat: now,
        exp: now + 60 * 60 * 24 * 3, // 3 dias
      };

      const token = jwt.sign(payload, process.env.AUTH_SECRET);

      res.status(200).send({ ...payload, token });
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: "ERROR", status: 500 });
    }
  },

  async validateToken(req, res) {
    try {
      const user = jwt.verify(req.body.token, process.env.AUTH_SECRET);
      res.status(200).send(user);
    } catch (e) {
      console.error(e);
      res.status(401).send({
        error: "Token inválido",
        status: 401,
      });
    }
  },
};
