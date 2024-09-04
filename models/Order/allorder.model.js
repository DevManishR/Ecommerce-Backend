import mongoose from "mongoose";

const allorderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    // orderStatus: {
    //   type: String,
    //   enum: ["pending", "completed"],
    //   default: "pending",
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AllOrder", allorderSchema);