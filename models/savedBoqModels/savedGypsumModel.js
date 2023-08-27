const mongoose = require("mongoose");
const savedGypsumSchema = mongoose.Schema(
  {
    mapId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "weka map id"],
      ref: "Map",
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
    gypsumData: [
      {
        quantity: {
          type: Number,
          default: 0,
        },
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Gypsum",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("SavedGypsum", savedGypsumSchema);
