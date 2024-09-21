import { Position } from "../models/position_model.js";

// When the coordinator of the club will post open positions
export const postPosition = async (req, res) => {
  try {
    const { title, description, requirements, openings, clubId } = req.body;
    const userId = req.id;

    if (!title || !description || !requirements || !openings || !clubId) {
      return res.status(400).json({
        message: "Some fields are missing.",
        success: false,
      });
    }

    const position = await Position.create({
      title,
      description,
      requirements: requirements.split(","),
      openings,
      club: clubId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New Open position created successfully.",
      position,
      success: true,
    });
  } catch (error) {
    console.log("An Error Occurred while posting the Opening");
  }
};

// For students to view all openings
export const getAllPositions = async (req, res) => {
  try {
    // for example user searches for "Content writer"
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const positions = await Position.find(query)
      .populate({
        path: "club",
      })
      .sort({ createdAt: -1 });

    if (!positions) {
      return res.status(404).json({
        message: "No openings found!!",
        success: false,
      });
    }

    return res.status(200).json({
      positions,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// For students to get opening using id
export const getPositionById = async (req, res) => {
  try {
    const positionId = req.params.id;
    const position = await Position.findById(positionId).populate({
      path: "applications",
    });
    if (!position) {
      return res.status(404).json({
        message: "No openings found!!",
        success: false,
      });
    }

    return res.status(200).json({
      position,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// How many opening the admin has posted?
export const getAdminPositions = async (req, res) => {
  try {
    const adminId = req.id;
    const positions = await Position.find({ created_by: adminId }).populate({
      path: "club",
      createdAt: -1,
    });

    if (!positions) {
      return res.status(404).json({
        message: "No Openings found!!",
        success: false,
      });
    }

    return res.status(200).json({
      positions,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
