const mongoose = require("mongoose");
const savedBlandering = mongoose.Schema(
  {
    mapId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "weka map id"],
       ref: "Map", 
    },
    isSaved: {
      type: Boolean,
       default:false, 
    },
    outsideData: [
      {
        quantity: {
          type: Number,
       default:0,
        },
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bland",   
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("SavedBlandOutside", savedBlandering);
