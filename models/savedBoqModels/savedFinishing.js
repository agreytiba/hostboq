const mongoose = require("mongoose");
const savedFinishingSchema = mongoose.Schema(
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

    finishData: [
      {
        quantity: {
          type: Number,
          default: 0,
        },
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Finishing",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("SavedFinish", savedFinishingSchema);
