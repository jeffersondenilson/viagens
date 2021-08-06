const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nome não informado"],
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: async () => {
        const emailExists = await this.findOne({ email: this.email });
        return !emailExists;
      },
      message: "Email já existe",
    },
    required: [true, "Email não informado"],
  },
  password: {
    type: String,
    required: [true, "Senha não informada"],
  },
});

module.exports = mongoose.model("User", UserSchema);
