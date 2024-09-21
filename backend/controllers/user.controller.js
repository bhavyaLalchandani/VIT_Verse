import { User } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register or Sign Up Logic
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, userRole } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !userRole) {
      return res.status(400).json({
        message: "Some Fields are Missing!",
        success: false,
      });
    }
    //Cloudinary Logic
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Please Upload a Profile Photo!",
        success: false,
      });
    }
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const user = await User.findOne({ email }); //look for same email
    if (user) {
      // if found
      return res.status(400).json({
        message:
          "A User with Same Email ID already exists, use a unique email or log in to the existing account!",
        success: false,
      });
    }

    // use hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      userRole,
      // Cloudinary
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    // Return Success message
    return res.status(201).json({
      message: "Account created successfully!",
      success: true,
    });
  } catch (error) {
    console.log("An Error Occurred while creating the User!");
  }
};

// Login control logic
export const login = async (req, res) => {
  try {
    const { email, password, userRole } = req.body;
    if (!email || !password || !userRole) {
      return res.status(400).json({
        message: "Some Fields are not filled!",
        success: false,
      });
    }

    // check if email exists in the DB
    // let is used so that the var can be modified later on
    let user = await User.findOne({ email });
    if (!user) {
      // if not found
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    // check if the password is correct or Not
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    // check if the user role is correct or not
    if (userRole != user.userRole) {
      return res.status(400).json({
        message: "Wrong role Selected!",
        success: false,
      });
    }

    // generate token for further state management
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userRole: user.userRole,
      profile: user.profile,
    };

    // store the token in cookie and return success msg
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back to VIT Verse, ${user.fullname}!`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("An Error Occurred While Logging in!");
  }
};

// Logout Control Logic
export const logout = async (req, res) => {
  try {
    // token = ""(Empty), max Age = 0(Expiratrion of the cookie),
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Profile Update Logic
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; // we will request file

    // cloudinary Logic will be implemented here for file post and get
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // skills array to store skills
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not Found!",
        success: false,
      });
    }

    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume comes here
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      // to save the cloudinary url
      user.profile.resumeOriginalName = file.originalname;
      // Save the original file name
    }
    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userRole: user.userRole,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully!",
      user,
      success: true,
    });
  } catch (error) {
    console.log("Couldn't Update Profile!");
  }
};
