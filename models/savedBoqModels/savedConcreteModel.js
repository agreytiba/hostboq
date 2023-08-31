const mongoose = require("mongoose");
const savedConcreteSchema = mongoose.Schema(
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

    concreteData: [
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
);
module.exports = mongoose.model("SavedConcrete", savedConcreteSchema);
