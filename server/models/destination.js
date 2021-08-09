const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
  state: {
    type: String,
    required: [true, "Campo obrigatório"],
  },
  cities: {
    type: [String],
    required: [true, "Campo obrigatório"],
  },
});

module.exports = mongoose.model("Destination", DestinationSchema);
