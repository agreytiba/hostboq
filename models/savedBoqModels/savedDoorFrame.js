const mongoose = require("mongoose");
const savedWindowschema = mongoose.Schema(
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

    frameData: [
      {
        quantity: {
          type: Number,
       default:0,
        },
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Door",   
        },
      },
    ],
  },
  {
    timestamps: true,
  }
) 
module.exports = mongoose.model("Frame", savedWindowschema);
