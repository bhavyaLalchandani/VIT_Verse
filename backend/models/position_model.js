import mongoose from "mongoose";

// club position schema doesnt contain salary location or etc fields they have been skipped
const positionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    openings: {
      type: Number,
      required: true,
    },
    club: {
      // relation for position and Clubs
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      // array to store applications
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const Position = mongoose.model("Position", positionSchema);
