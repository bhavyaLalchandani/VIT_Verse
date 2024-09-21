import mongoose from "mongoose";

// club role schema doesnt contain salary location or etc fields they have been skipped
const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    logo: {
      type: String, // URL to logo file
    },
    userId: {
      // relation for User and Clubs
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Club = mongoose.model("Club", clubSchema);
