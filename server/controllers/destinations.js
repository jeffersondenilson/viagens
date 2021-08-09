const Destination = require("../models/destination");

module.exports = {
  async readAll() {
    try {
      const destinations = await Destination.find({}).exec();
      res.status(200).send(destinations);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "ERROR", status: 500 });
    }
  },
};
