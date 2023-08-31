const mongoose = require("mongoose");
const savedBeamSchema = mongoose.Schema(
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

    beamData: [
      {
        quantity: {
          type: Number,
       default:0,
        },
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sub",   
        },
      },
    ],
  },
  {
    timestamps: true,
  }
) 
module.exports = mongoose.model("SavedBeam", savedBeamSchema);
