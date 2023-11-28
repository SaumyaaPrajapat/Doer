const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
  },
});

const List = mongoose.model("List", listSchema);
module.exports = List;
