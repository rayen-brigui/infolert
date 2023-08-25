const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 1 },
});

const Counter = mongoose.model("Counter", counterSchema);
const productSchema = new mongoose.Schema({
  id: Number,
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  quantity: {
    required: true,
    type: Number,
  },
  location: {
    required: true,
    type: String,
  },
});
productSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        "product_id", // The ID of the counter document
        { $inc: { sequence_value: 1 } },
        { new: true }
      );
      this.id = counter.sequence_value;
    } catch (error) {
      return next(error);
    }
  }
  next();
});
module.exports = mongoose.model("Product", productSchema);
