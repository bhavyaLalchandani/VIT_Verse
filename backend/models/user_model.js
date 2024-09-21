import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      enum: ["student", "clubCoordinator"],
      required: true,
    },
    profile: {
      // you can edit later hence not (required = true)
      bio: { type: String },
      skills: [{ type: String }], // array to store skills
      resume: { type: String }, // URL to resume file
      resumeOriginalName: { type: String },
      club: { type: mongoose.Schema.Types.ObjectId, ref: "Club" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
