const mongoose = require("mongoose");
const savedSchema = mongoose.Schema(
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
    pvcData: [
      {
        quantity: {
          type: Number,
        default:0,
        },
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PVC",   
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Savedpvc", savedSchema);
