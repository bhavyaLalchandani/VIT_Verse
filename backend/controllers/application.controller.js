import { Application } from "../models/application_model.js";
import { Position } from "../models/position_model.js";

export const applyPosition = async (req, res) => {
  try {
    const userId = req.id;
    const positionId = req.params.id;
    if (!positionId) {
      return res.status(400).json({
        message: "Opening Id is required.",
        success: false,
      });
    }

    // check if the user has already applied for the position
    const existingApplication = await Application.findOne({
      position: positionId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this position",
        success: false,
      });
    }

    // check if the jobs exists
    const position = await Position.findById(positionId);
    if (!position) {
      return res.status(404).json({
        message: "Opening not found",
        success: false,
      });
    }

    // create a new application
    const newApplication = await Application.create({
      position: positionId,
      applicant: userId,
    });

    position.applications.push(newApplication._id);
    await position.save();
    return res.status(201).json({
      message: "You have applied successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get a User's Applied Openings
export const getAppliedPositions = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "position",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "club",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications Submitted!",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log("An Error occurred while fetching applications");
  }
};

// Club Coordinator will check how many students have applied
export const getApplicants = async (req, res) => {
  try {
    const positionId = req.params.id;
    const position = await Position.findById(positionId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!position) {
      return res.status(404).json({
        message: "Opening not found!",
        success: false,
      });
    }
    return res.status(200).json({
      position,
      success: true,
    });
  } catch (error) {
    console.log("An error occurred while fetching applicants!");
  }
};

// To Update the status pf the Application "Rejected or Selected"
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    // find an application by applicant id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found!",
        success: false,
      });
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log("An error occurred while fetching status!");
  }
};
