import { Club } from "../models/club_model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Club registration Logic
export const registerClub = async (req, res) => {
  try {
    const { clubName, clubEmail } = req.body;
    if (!clubName || !clubEmail) {
      return res.status(400).json({
        message: "Club's name or email is missing.",
        success: false,
      });
    }

    let club = await Club.findOne({ name: clubName });
    if (club) {
      return res.status(400).json({
        message: "Club already exists",
        success: false,
      });
    }

    club = await Club.create({
      name: clubName,
      email: clubEmail,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Club Registered Successfully!",
      club,
      success: true,
    });
  } catch (error) {
    console.log("Couldn't Register Club");
  }
};

// Get Clubs by User Id
export const getClub = async (req, res) => {
  try {
    // as the current user will find their club
    const userId = req.id; // logged in user id
    const clubs = await Club.find({ userId });
    if (!clubs) {
      return res.status(404).json({
        message: "Clubs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      clubs,
      success: true,
    });
  } catch (error) {
    console.log("Error while fetching clubs!");
  }
};

// get Club by id
export const getClubById = async (req, res) => {
  try {
    const clubId = req.params.id;
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({
        message: "Club not found.",
        success: false,
      });
    }
    return res.status(200).json({
      club,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// To Update Club details
export const updateClub = async (req, res) => {
  try {
    const { name, email, description, website } = req.body;

    const file = req.file;

    // CLOUDINARY CODE
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, email, description, website, logo };

    const club = await Club.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!club) {
      return res.status(404).json({
        message: "Club not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Club information updated!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
