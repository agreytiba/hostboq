const mongoose = require("mongoose");
const savedSkimOutside = mongoose.Schema(
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

    skimData: [
      {
        quantity: {
          type: Number,
       default:0,
        },
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skim",   
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("SavedSkimOutside", savedSkimOutside);
