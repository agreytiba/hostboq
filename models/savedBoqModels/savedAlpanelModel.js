const mongoose = require("mongoose");
const savedAlpanelschema = mongoose.Schema(
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

    panelData: [
      {
        quantity: {
          type: Number,
       default:0,
        },
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Window",   
        },
      },
    ],
  },
  {
    timestamps: true,
  }
) 
module.exports = mongoose.model("Panel", savedAlpanelschema);
