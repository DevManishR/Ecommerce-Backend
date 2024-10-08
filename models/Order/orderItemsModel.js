import mongoose from "mongoose";

const ordertableSchema = new mongoose.Schema(
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
    reviewid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      default:null
    },
    orderStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("OrderItem", ordertableSchema);
