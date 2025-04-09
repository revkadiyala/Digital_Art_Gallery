const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { Mongoose } = require("mongoose");
const admin = require("../models/admin.model");
const user = require("../models/user.model");
const multer = require("multer");
const art = require("../models/art.model");
const Art = require("../models/art.model");
const Artist = require("../models/artist.model");
const category = require("../models/category.model");
const buyArt = require("../models/buyArt.model");
const Review = require("../models/review.model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Set the folder where files will be uploaded
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Set the file name
  },
});

exports.upload = multer({ storage });

function generateToken(userid) {
  return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}

exports.createAdmin = async (req, res) => {
  try {
    const { admin_Name, admin_Email, password } = req.body;

    // Validating email, full name, mobile number, password, and confirm password
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;

    if (!admin_Email) {
      return res
        .status(400)
        .send({ message: "Email is required", status: 400 });
    } else if (!admin_Email.match(emailRegex)) {
      return res
        .status(400)
        .send({ message: "Please provide a valid Email address", status: 400 });
    }

    if (!admin_Name) {
      return res
        .status(400)
        .send({ message: "admin  name is required", status: 400 });
    }

    if (!password) {
      return res
        .status(400)
        .send({ message: "Password is required", status: 400 });
    }

    const checkEmail = await admin.findOne({ admin_Email }).lean();
    if (checkEmail) {
      return res
        .status(409)
        .send({ message: "Email already exists", status: 409 });
    }

    const data = await admin.create({
      admin_Name: admin_Name,
      admin_Email: admin_Email.toLowerCase(),
      password: bcrypt.hashSync(password),
    });

    return res.status(200).send({
      data,
      message: "Congratulations! Your account has been created successfully!",
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating an account",
      status: 500,
    });
  }
};

//admin login
exports.adminLogin = (req, res) => {
  // Request validation
  if (!req.body || !req.body.admin_Email || !req.body.password) {
    return res.status(400).send({
      message: "Please provide both admin email and password.",
      status: 400,
    });
  }

  const admin_Email = req.body.admin_Email.toLowerCase();

  // Check, get, and verify login data from the database
  admin
    .findOne({ admin_Email: admin_Email, deleteFlag: false })
    .then((foundAdmin) => {
      if (!foundAdmin) {
        return res
          .status(404)
          .send({ message: "Email does not exist.", status: 404 });
      }

      console.log(foundAdmin);

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        foundAdmin.password
      );
      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ message: "Invalid password!.", status: 401 });
      }

      const token = generateToken(foundAdmin._id);
      return res
        .status(200)
        .send({ accessToken: token, data: foundAdmin, status: 200 });
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal server error.", status: 500 });
    });
};

exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users except those marked as deleted
    const users = await user.find({ deleteFlag: false }).select("-password"); // Exclude the password field
    const totalCount = await user.countDocuments({ deleteFlag: false }); // Count the total users

    return res.status(200).send({
      data: users,
      totalCount, // Include the total count
      message: "Users fetched successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "An error occurred while fetching users",
      status: 500,
    });
  }
};

exports.getAllArtist = async (req, res) => {
  try {
    // Fetch all users except those marked as deleted
    const users = await Artist.find({ deleteFlag: false }).select("-password"); // Exclude the password field
    const totalCount = await Artist.countDocuments({ deleteFlag: false }); // Count the total users

    return res.status(200).send({
      data: users,
      totalCount, // Include the total count
      message: "Artist get successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "An error occurred while fetching users",
      status: 500,
    });
  }
};

// Edit user data by admin
exports.editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { user_FullName, user_Email, country_code, mobile_no } = req.body;

    // Validate request data
    if (!user_FullName || !user_Email || !country_code || !mobile_no) {
      return res
        .status(400)
        .send({ message: "All fields are required", status: 400 });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!user_Email.match(emailRegex)) {
      return res
        .status(400)
        .send({ message: "Please provide a valid email address", status: 400 });
    }

    const existingUser = await user.findOne({ _id: userId }).lean();
    if (!existingUser) {
      return res.status(404).send({ message: "User not found", status: 404 });
    }

    const updatedUser = await user.findOneAndUpdate(
      { _id: userId },
      { $set: { user_FullName, user_Email, country_code, mobile_no } },
      { new: true }
    );

    return res.status(200).send({
      data: updatedUser,
      message: "User updated successfully",
      status: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error updating user", status: 500 });
  }
};

// Delete user by admin
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const existingUser = await user.findOne({ _id: userId }).lean();
    if (!existingUser) {
      return res.status(404).send({ message: "User not found", status: 404 });
    }

    await user.findOneAndUpdate(
      { _id: userId },
      { $set: { deleteFlag: true } }
    );

    return res
      .status(200)
      .send({ message: "User deleted successfully", status: 200 });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error deleting user", status: 500 });
  }
};

exports.addArt = async (req, res) => {
  try {
    const {
      artistId,
      artist_name,
      addedBy,
      art_name,
      price,
      category,
      description,
    } = req.body;
    const photos = req.files?.photos
      ? req.files.photos.map((file) => file.path)
      : [];

    // Validate required fields
    if (
      !artistId ||
      !artist_name ||
      !addedBy ||
      !art_name ||
      !price ||
      photos.length === 0 ||
      !category
    ) {
      return res.status(400).json({
        error:
          "All fields are required, including artistId, addedBy, and at least one photo",
      });
    }

    // Check if art_name already exists
    const existingArt = await Art.findOne({ art_name });
    if (existingArt) {
      return res.status(400).json({
        error: "Art name must be unique. This art name already exists.",
      });
    }

    // Ensure addedBy is either 'Admin' or 'Vendor'
    if (!["Admin", "Vendor"].includes(addedBy)) {
      return res.status(400).json({
        error: "Invalid 'addedBy' value. Must be 'Admin' or 'Vendor'",
      });
    }

    const newArt = new Art({
      artistId, // Store artistId
      artist_name,
      addedBy, // Store if Admin or Vendor added the art
      art_name,
      description,
      dateAdded: new Date(),
      photos,
      category,
      price,
      status: 0,
    });

    // Save the art to the database
    const savedArt = await newArt.save();
    res
      .status(201)
      .json({ art: savedArt, message: "Art added successfully", status: 200 });
  } catch (error) {
    console.error("Error adding art", error);
    res.status(500).json({ error: "Failed to add art", status: 500 });
  }
};

// Update Art Status (Admin only)
exports.updateArtStatus = async (req, res) => {
  try {
    const { artId, status } = req.body;

    // Validate input
    if (!artId || typeof status === "undefined") {
      return res.status(400).json({ error: "Art ID and status are required." });
    }

    if (![0, 1].includes(status)) {
      return res.status(400).json({ error: "Status must be 0 or 1." });
    }

    const updatedArt = await Art.findByIdAndUpdate(
      artId,
      { status },
      { new: true }
    );

    if (!updatedArt) {
      return res.status(404).json({ error: "Art not found." });
    }

    res
      .status(200)
      .json({ art: updatedArt, message: `Art status updated to ${status}` });
  } catch (error) {
    console.error("Error updating art status", error);
    res.status(500).json({ error: "Failed to update status" });
  }
};

exports.getArtsByArtist = async (req, res) => {
  try {
    const { artistId, addedBy } = req.query; // Get artistId and addedBy from query parameters

    if (!artistId) {
      return res.status(400).json({ error: "Artist ID is required" });
    }

    let query = { artistId };

    // If addedBy filter is provided, apply it
    if (addedBy) {
      if (!["Admin", "Vendor"].includes(addedBy)) {
        return res.status(400).json({
          error: "Invalid 'addedBy' value. Must be 'Admin' or 'Vendor'",
        });
      }
      query.addedBy = addedBy;
    }

    // Fetch all artworks created by this artist
    const arts = await Art.find(query);

    if (arts.length === 0) {
      return res
        .status(404)
        .json({ message: "No artworks found for this artist" });
    }

    res
      .status(200)
      .json({ arts, message: "Art fetched successfully", status: 200 });
  } catch (error) {
    console.error("Error fetching artworks", error);
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
};

//  Get Art details
exports.getArt = async (req, res) => {
  try {
    const arts = await art.find();
    if (arts.length === 0) {
      return res.status(404).json({ message: "No art found" });
    }
    res.status(200).json({ message: "Arts retrieved successfully", arts });
  } catch (error) {
    console.error("Error fetching arts", error);
    res.status(500).json({ error: "Failed to retrieve arts" });
  }
};

//  Get Art by Id
exports.getArtById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request parameters
    const artdata = await art.findById(id); // Find art by ID

    if (!artdata) {
      return res.status(404).json({ message: "Art not found" });
    }

    res.status(200).json({ message: "Success", data: artdata });
  } catch (error) {
    console.error("Error get art", error);
    res.status(500).json({ error: "Failed to get art" });
  }
};

// Update Art
exports.updateArt = async (req, res) => {
  try {
    const { artId } = req.params;
    const { artist_name, art_name, price, category, description } = req.body;
    const photos = req.files?.photos
      ? req.files.photos.map((file) => file.path)
      : [];

    // Find existing art
    const existingArt = await art.findById(artId);
    if (!existingArt) {
      return res.status(404).json({ error: "Art not found" });
    }

    // Update fields if provided
    if (artist_name) existingArt.artist_name = artist_name;
    if (category) existingArt.category = category;
    if (art_name) existingArt.art_name = art_name;
    if (description) existingArt.description = description;
    if (price) existingArt.price = price;
    if (photos.length > 0) existingArt.photos = photos;

    // Save the updated art
    const updatedArt = await existingArt.save();
    res
      .status(200)
      .json({ message: "Art updated successfully", art: updatedArt });
  } catch (error) {
    console.error("Error updating art", error);
    res.status(500).json({ error: "Failed to update art" });
  }
};

// delete art
exports.deleteArt = async (req, res) => {
  try {
    const { artId } = req.params;
    const deletedArt = await art.findByIdAndDelete(artId);

    if (!deletedArt) {
      return res.status(404).json({ message: "Art not found" });
    }

    res
      .status(200)
      .json({ message: "Art deleted successfully", art: deletedArt });
  } catch (error) {
    console.error("Error deleting art", error);
    res.status(500).json({ error: "Failed to delete art" });
  }
};

// add category

exports.addCategory = async (req, res) => {
  const { category_name } = req.body;
  if (!category_name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newCategory = new category({
    category_name,
  });
  // Save the category to the database
  const savedCategory = await newCategory.save();
  res
    .status(201)
    .json({ message: "Category added successfully", data: savedCategory });
};

// Upadet category

exports.updateCategory = async (req, res) => {
  const { id } = req.params; // Get category ID from request params
  const { category_name } = req.body; // Get new category name from request body

  if (!category_name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    // Find and update the category by ID
    const updatedCategory = await category.findByIdAndUpdate(
      id,
      { category_name },
      { new: true, runValidators: true } // Return updated document and validate inputs
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

//  Delete category

exports.deleteCategory = async (req, res) => {
  const { id } = req.params; // Get category ID from request params

  try {
    // Find and delete the category by ID
    const deletedCategory = await category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get category

exports.getCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await category.find();

    res
      .status(200)
      .json({ message: "Categories get successfully", data: categories });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// add comment
exports.addComment = async (req, res) => {
  try {
    const { artId } = req.params;
    const { userId, text } = req.body;

    if (!userId || !text) {
      return res
        .status(400)
        .json({ error: "User ID and comment text are required" });
    }

    // Fetch user details correctly
    const userData = await user.findById(userId);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch art details correctly
    const artData = await art.findById(artId);
    if (!artData) {
      return res.status(404).json({ error: "Art not found" });
    }

    // Add the new comment with user name
    const newComment = {
      userId,
      userName: userData.user_FullName,
      text,
      createdAt: new Date(),
    };
    artData.comments.push(newComment);

    // Save the updated art document
    await artData.save();

    res.status(200).json({
      message: "Comment added successfully",
      commentCount: artData.comments.length, // Returning comment count
      comments: artData.comments, // Return updated comments
    });
  } catch (error) {
    console.error("Error adding comment", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

// add like
exports.addLike = async (req, res) => {
  try {
    const { artId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const artdata = await Art.findById(artId); // Use 'Art' (correct model reference)
    if (!artdata) {
      return res.status(404).json({ error: "Art not found" });
    }

    // Ensure likes is an array
    if (!artdata.likes) {
      artdata.likes = [];
    }

    const likeIndex = artdata.likes.findIndex((id) => id.toString() === userId);

    let message;
    if (likeIndex === -1) {
      // Add like
      artdata.likes.push(userId);
      message = "Liked successfully";
    } else {
      // Remove like
      artdata.likes.splice(likeIndex, 1);
      message = "Unliked successfully";
    }

    // Save the updated art document
    await artdata.save();

    res.status(200).json({
      message,
      likeCount: artdata.likes.length,
      art: artdata,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Failed to toggle like" });
  }
};

exports.getAllCount = async (req, res) => {
  try {
    // Fetching counts from each model
    const userCount = await user.countDocuments();
    const artCount = await art.countDocuments();
    const artistCount = await Artist.countDocuments();
    const categoryCount = await category.countDocuments();

    // Sending response
    res.status(200).json({
      success: true,
      message: "Counts fetched successfully",
      data: {
        users: userCount,
        arts: artCount,
        artists: artistCount,
        categories: categoryCount,
      },
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch counts",
      error: error.message,
    });
  }
};

// Edit artist data by admin
exports.editArtist = async (req, res) => {
  try {
    const artistId = req.params.artistId;
    const { user_FullName, country_code, mobile_no } = req.body;

    // Validate request data
    if (!user_FullName || !country_code || !mobile_no) {
      return res
        .status(400)
        .send({ message: "All fields are required", status: 400 });
    }

    const existingArtist = await Artist.findOne({ _id: artistId }).lean();
    if (!existingArtist) {
      return res.status(404).send({ message: "Artist not found", status: 404 });
    }

    const updatedArtist = await Artist.findOneAndUpdate(
      { _id: artistId },
      { $set: { user_FullName, country_code, mobile_no } },
      { new: true }
    );

    return res.status(200).send({
      data: updatedArtist,
      message: "Artist updated successfully",
      status: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error updating artist", status: 500 });
  }
};

// delete Artist by admin
exports.deleteArtist = async (req, res) => {
  try {
    const artistId = req.params.artistId;

    const existingArtist = await Artist.findOne({ _id: artistId }).lean();
    if (!existingArtist) {
      return res.status(404).send({ message: "Artist not found", status: 404 });
    }

    await Artist.findOneAndUpdate(
      { _id: artistId },
      { $set: { deleteFlag: true } }
    );

    return res
      .status(200)
      .send({ message: "Artist deleted successfully", status: 200 });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error deleting Artist", status: 500 });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users except those marked as deleted
    const users = await user.find({ deleteFlag: false }).select("-password"); // Exclude the password field
    const totalCount = await user.countDocuments({ deleteFlag: false }); // Count the total users

    return res.status(200).send({
      data: users,
      totalCount, // Include the total count
      message: "Users fetched successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "An error occurred while fetching users",
      status: 500,
    });
  }
};

// Get all purchase details (for Admin)
exports.getAllBuyArt = async (req, res) => {
  try {
    const purchases = await buyArt
      .find({ deleteFlag: false })
      .populate("user_Id", "user_FullName") // Populate user details
      .populate("art_Id", " artist_name art_name artist_Id price photos"); // Populate art details

    return res.status(200).json({
      data: purchases,
      message: "All purchase details retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// Get buy art details by userId
exports.getBuyArtByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const purchases = await buyArt
      .find({ user_Id: userId })
      .populate("user_Id", "user_FullName") // Populate user details
      .populate("art_Id", "artist_name art_name artist_Id price photos"); // Populate user details

    return res.status(200).json({
      data: purchases,
      message: "art details get successfully.",
      status: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "user_FullName") // Fetch user details
      .populate("artId", "art_name artistId") // Fetch art details
      .populate("buyArtId", "_id") // Include buyArt reference
      .exec();

    return res.status(200).json({
      data: reviews,
      message: "All reviews fetched successfully.",
      status: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// Get 10% commission on each buy art (for Admin)
exports.getAdminCommissions = async (req, res) => {
  try {
    const purchases = await buyArt
      .find({ deleteFlag: false })
      .populate("user_Id", "user_FullName")
      .populate("art_Id", "art_name artist_Id price photos");

    if (!purchases || purchases.length === 0) {
      return res.status(404).json({ message: "No purchases found." });
    }

    // Map through purchases to calculate 10% commission
    const commissions = purchases.map((purchase) => {
      const art = purchase.art_Id;
      const price = art?.price || 0;
      const commission = +(price * 0.1).toFixed(2); // 10% commission, rounded to 2 decimals

      return {
        purchaseId: purchase._id,
        art_name: art?.art_name,
        user: purchase.user_Id?.user_FullName,
        price,
        commission,
        date: purchase.createdAt,
        photos: art?.photos || [],
      };
    });

    return res.status(200).json({
      data: commissions,
      message: "Admin commission details retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};
