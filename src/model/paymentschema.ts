import mongoose, { Document, Schema } from "mongoose";

// TypeScript Interface
export interface IPayment extends Document {
  senderUsername: string;
  receiverUsername: string;
  amount: number;

  orderId: string;
  paymentId?: string;
  signature?: string;

  status: "pending" | "success" | "failed";

  message?: string;

  createdAt: Date;
  updatedAt: Date;
}

// Schema
const paymentSchema = new Schema<IPayment>(
  {
    senderUsername: {
      type: String,
      required: true,
      trim: true,
    },

    receiverUsername: {
      type: String,
      required: true,
      trim: true,
      index: true, 
    },

    amount: {
      type: Number,
      required: true,
      min: 1, 
    },

    orderId: {
      type: String,
      required: true,
      unique: true, 
    },

    paymentId: {
      type: String,
    },

    signature: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    message: {
      type: String,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment =
  mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", paymentSchema);