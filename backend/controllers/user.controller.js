const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const user = require('../models/user.model');
const artist = require('../models/artist.model');
const Art = require('../models/art.model');
const buyArt = require('../models/buyArt.model')
const Review = require('../models/review.model')

function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}


exports.userSignUp = async (req, res) => {
    let user_Email = req.body.user_Email ? req.body.user_Email : "";
    let user_FullName = req.body.user_FullName ? req.body.user_FullName : "";
    let country_code = req.body.country_code ? req.body.country_code : "";
    let mobile_no = req.body.mobile_no ? req.body.mobile_no : "";
    let password = req.body.password ? req.body.password : "";
    let confirmPassword = req.body.confirmPassword
      ? req.body.confirmPassword
      : "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;
  
    try {
      if (user_Email === null || user_Email === "") {
        return res
          .status(400)
          .send({ message: "email is required", status: 200 });
      } else {
        if (!user_Email.match(mailformat)) {
          return res
            .status(400)
            .send({ message: "email is not in correct form", status: 400 });
        } else {
          if (user_FullName === "" || user_FullName === null) {
            return res
              .status(400)
              .send({ message: "Full name is required", status: 200 });
          }else {
              if (country_code === "" || country_code === null) {
                return res
                  .status(400)
                  .send({ message: "Country code is required", status: 200 });
              } else {
                if (mobile_no === null || mobile_no === "") {
                  return res.status(400).send({
                    message: "Mobile Number is required",
                    status: 400,
                  });
                } else {
                  if (mobile_no.length < 7) {
                    return res.status(400).send({
                      message: "Mobile number cannot be less than 7 digits. ",
                      status: 400,
                    });
                  } else {
                    if (mobile_no.length > 10) {
                      return res.status(400).send({
                        message:
                          "Mobile numbers cannot be more than 10 digits long.",
                        status: 400,
                      });
                    } else {
                      if (isNaN(mobile_no)) {
                        return res.status(400).send({
                          message: "Mobile number must only contains digits",
                          status: 400,
                        });
                      } else {
                        if (password === null || password === "") {
                          return res.status(400).send({
                            message: "Password is required",
                            status: 400,
                          });
                        } else {
                          if (password.length < 8) {
                            return res.status(400).send({
                              message:
                                "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)",
                              status: 400,
                            });
                          } else {
                            if (!password.match(passformat)) {
                              return res.status(400).send({
                                message:
                                  "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)",
                                status: 400,
                              });
                            } else {
                              if (
                                confirmPassword === "" ||
                                confirmPassword === null
                              ) {
                                return res.status(400).send({
                                  message: "confirm password is required",
                                  status: 400,
                                });
                              } else {
                                if (confirmPassword !== password) {
                                  return res.status(400).send({
                                    message:
                                      "password and confirm password are not the same",
                                    status: 400,
                                  });
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      
  
      let checkEmail = await user.find({ user_Email: user_Email }).lean();
      if (checkEmail.length > 0) {
        return res
          .status(409)
          .send({ message: "Email already exists", status: 409 });
      }
  
      let checkMobileNo = await user.find({ mobile_no: mobile_no }).lean();
      if (checkMobileNo.length > 0) {
        return res
          .status(409)
          .send({ message: "Mobile number already exists", status: 409 });
      }
  
      let data = await user.create({
        user_Email: user_Email,
        user_FullName: user_FullName,
        country_code: country_code,
        mobile_no: mobile_no,
        password: bcrypt.hashSync(password, 8),
        confirmPassword: confirmPassword,
      });
  
      return res
        .status(200)
        .send({ data: data, message: "Success", status: 200 });
    } catch (error) {
      return res
        .status(500)
        .send({  message: error.message, status: 500 });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const user_Email = (req.body.user_Email || '').toLowerCase();
        const password = req.body.password || '';

        // Validation
        if (!user_Email || !password) {
            return res.status(400).send({ message: 'Please provide both email and password.', status: 400 });
        }

        const userData = await user.findOne({ "user_Email": user_Email, deleteFlag: false });

        if (!userData) {
            return res.status(404).send({ message: 'Your email is not registered with us.', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(password, userData.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Please enter a valid password.', status: 401 });
        }

        const token = generateToken(userData._id);
        return res.status(200).send({ accessToken: token, data: userData, message: 'Login successful!', status: 200 });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error.', status: 500 });
    }
};

exports.changeUserPassword = async (req, res) => {
    try {
        const usersRegId = req.params.usersRegId;
        const oldPassword = req.body.oldPassword || '';
        const newPassword = req.body.newPassword || '';
        const confirmPassword = req.body.confirmPassword || '';
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;


        // Validate request data
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).send({ message: 'All password fields must be provided', status: 400 });
        } else {
            if (!newPassword.match(passwordRegex)) {
                return res.status(400).send({ message: "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)", status: 400 });
            }
        }

        if (newPassword !== confirmPassword) {
            return res.status(401).send({ message: 'New password and confirm password do not match', status: 401 });
        }

        const existingUser = await user.findOne({ _id: usersRegId }).lean();
        if (!existingUser) {
            return res.status(404).send({ message: 'User not found', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(oldPassword, existingUser.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Incorrect old password', status: 401 });
        }

        await user.findOneAndUpdate({ _id: usersRegId }, { $set: { password: bcrypt.hashSync(newPassword, 8) } });

        return res.status(200).send({ message: 'Password changed successfully', status: 200 });
    } catch (err) {
        return res.status(500).send({ message: err.message || 'Error changing password', status: 500 });
    }
};

exports.artistSignUp = async (req, res) => {
  let user_Email = req.body.user_Email ? req.body.user_Email : "";
  let user_FullName = req.body.user_FullName ? req.body.user_FullName : "";
  let country_code = req.body.country_code ? req.body.country_code : "";
  let mobile_no = req.body.mobile_no ? req.body.mobile_no : "";
  let password = req.body.password ? req.body.password : "";
  let confirmPassword = req.body.confirmPassword
    ? req.body.confirmPassword
    : "";
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;

  try {
    if (user_Email === null || user_Email === "") {
      return res
        .status(400)
        .send({ message: "email is required", status: 200 });
    } else {
      if (!user_Email.match(mailformat)) {
        return res
          .status(400)
          .send({ message: "email is not in correct form", status: 400 });
      } else {
        if (user_FullName === "" || user_FullName === null) {
          return res
            .status(400)
            .send({ message: "Full name is required", status: 200 });
        }else {
            if (country_code === "" || country_code === null) {
              return res
                .status(400)
                .send({ message: "Country code is required", status: 200 });
            } else {
              if (mobile_no === null || mobile_no === "") {
                return res.status(400).send({
                  message: "Mobile Number is required",
                  status: 400,
                });
              } else {
                if (mobile_no.length < 7) {
                  return res.status(400).send({
                    message: "Mobile number cannot be less than 7 digits. ",
                    status: 400,
                  });
                } else {
                  if (mobile_no.length > 10) {
                    return res.status(400).send({
                      message:
                        "Mobile numbers cannot be more than 10 digits long.",
                      status: 400,
                    });
                  } else {
                    if (isNaN(mobile_no)) {
                      return res.status(400).send({
                        message: "Mobile number must only contains digits",
                        status: 400,
                      });
                    } else {
                      if (password === null || password === "") {
                        return res.status(400).send({
                          message: "Password is required",
                          status: 400,
                        });
                      } else {
                        if (password.length < 8) {
                          return res.status(400).send({
                            message:
                              "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)",
                            status: 400,
                          });
                        } else {
                          if (!password.match(passformat)) {
                            return res.status(400).send({
                              message:
                                "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)",
                              status: 400,
                            });
                          } else {
                            if (
                              confirmPassword === "" ||
                              confirmPassword === null
                            ) {
                              return res.status(400).send({
                                message: "confirm password is required",
                                status: 400,
                              });
                            } else {
                              if (confirmPassword !== password) {
                                return res.status(400).send({
                                  message:
                                    "password and confirm password are not the same",
                                  status: 400,
                                });
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    

    let checkEmail = await artist.find({ user_Email: user_Email }).lean();
    if (checkEmail.length > 0) {
      return res
        .status(409)
        .send({ message: "Email already exists", status: 409 });
    }

    let checkMobileNo = await artist.find({ mobile_no: mobile_no }).lean();
    if (checkMobileNo.length > 0) {
      return res
        .status(409)
        .send({ message: "Mobile number already exists", status: 409 });
    }

    let data = await artist.create({
      user_Email: user_Email,
      user_FullName: user_FullName,
      country_code: country_code,
      mobile_no: mobile_no,
      password: bcrypt.hashSync(password, 8),
      confirmPassword: confirmPassword,
    });

    return res
      .status(200)
      .send({ data: data, message: "Success", status: 200 });
  } catch (error) {
    return res
      .status(500)
      .send({  message: error.message, status: 500 });
  }
};

exports.artistLogin = async (req, res) => {
  try {
      const user_Email = (req.body.user_Email || '').toLowerCase();
      const password = req.body.password || '';

      // Validation
      if (!user_Email || !password) {
          return res.status(400).send({ message: 'Please provide both email and password.', status: 400 });
      }

      const userData = await artist.findOne({ "user_Email": user_Email, deleteFlag: false });

      if (!userData) {
          return res.status(404).send({ message: 'Your email is not registered with us.', status: 404 });
      }

      const passwordIsValid = bcrypt.compareSync(password, userData.password);
      if (!passwordIsValid) {
          return res.status(401).send({ message: 'Please enter a valid password.', status: 401 });
      }

      const token = generateToken(userData._id);
      return res.status(200).send({ accessToken: token, data: userData, message: 'Login successful!', status: 200 });
  } catch (error) {
      return res.status(500).send({ message: 'Internal server error.', status: 500 });
  }
};


exports.followArtist = async (req, res) => {
  try {
      const { userId, artistId } = req.body;
      if (!userId || !artistId) {
          return res.status(400).json({ message: "User ID and Artist ID are required." });
      }

      const userData = await user.findById(userId); // Renamed 'user' to 'userData'
      if (!userData) {
          return res.status(404).json({ message: "User not found." });
      }

      if (userData.following.includes(artistId)) {
          // Unfollow the artist
          await user.findByIdAndUpdate(userId, { $pull: { following: artistId } });
          return res.status(200).json({ message: "Unfollowed the artist successfully." });
      } else {
          // Follow the artist
          await user.findByIdAndUpdate(userId, { $push: { following: artistId } });
          return res.status(200).json({ message: "Followed the artist successfully." });
      }
  } catch (error) {
      return res.status(500).json({ message: "Server error.", error: error.message });
  }
};




exports.getFollowersByUserId = async (req, res) => {
  try {
      const { userId } = req.params;
      if (!userId) {
          return res.status(400).json({ message: "User ID is required." });
      }

      const userData = await user.findById(userId).populate('following', 'user_FullName user_Email');
      if (!userData) {
          return res.status(404).json({ message: "User not found." });
      }

      // return res.status(200).json({ following: userData.following });
      return res.status(200).send({ 
        following: userData.following, 
        message: "Followers fetched successfully", 
        status: 200 
    });
  } catch (error) {
      return res.status(500).json({ message: "Server error.", error: error.message });
  }
};


exports.getFollowersByArtistId = async (req, res) => {
  try {
      const { artistId } = req.params;
      if (!artistId) {
          return res.status(400).json({ message: "Artist ID is required." });
      }

      const followers = await user.find({ following: artistId }).select('user_FullName user_Email');
      if (!followers.length) {
          return res.status(404).json({ message: "No followers found for this artist." });
      }

      // return res.status(200).json({ followers });
      return res.status(200).send({ 
        followers, 
        message: "Followers fetched successfully", 
        status: 200 
    });
  } catch (error) {
      return res.status(500).json({ message: "Server error.", error: error.message });
  }
};



exports.searchArt = async (req, res) => {
  try {
      const { category, price } = req.query;

      // Create a search filter
      let filter = {
        status: 1 // Only show active arts
      };

      if (category) {
          filter.category = { $regex: category, $options: 'i' }; // Case-insensitive search
      }

      if (price) {
          filter.price = Number(price); // Convert price to a number
      }

      const artResults = await Art.find(filter);

      if (artResults.length === 0) {
          return res.status(404).json({ message: "No art found matching the criteria." });
      }

      // return res.status(200).json({ results: artResults });
      return res.status(200).send({ 
        data: artResults, 
        message: "Art fetched successfully", 
        status: 200 
      });
  } catch (error) {
      return res.status(500).json({ message: "Server error.", error: error.message });
  }
};


exports.buyArt = async (req, res) => {
  try {
      const { user_Id, art_Id, cardNumber, expiryMonth, expiryYear, cvv, cardHolderName } = req.body;
      
      if (!user_Id || !art_Id || !cardNumber || !expiryMonth || !expiryYear || !cvv || !cardHolderName) {
          return res.status(400).json({ message: "User ID, Art ID, and Card Details are required." });
      }

      // Find Art Details
      const art = await Art.findById(art_Id);
      if (!art) {
          return res.status(404).json({ message: "Art not found." });
      }

      // Find User
      const userData = await user.findById(user_Id);
      if (!userData) {
          return res.status(404).json({ message: "User not found." });
      }

      // Store Purchase in Database
      const newPurchase = new buyArt({
          user_Id,
          art_Id,
          cardDetails: {
              cardNumber: cardNumber.slice(-4), // Store only last 4 digits
              expiryMonth,
              expiryYear,
              cardHolderName
          },
          price: art.price,
          paymentStatus: "Completed",
          deleteFlag: false
      });

      await newPurchase.save();

      return res.status(200).json({
          message: "Purchase successful!",
          artDetails: {
              _id: art._id,
              art_name: art.art_name,
              price: art.price
          },
          purchaseDetails: newPurchase,
          status: 200 
      });

  } catch (error) {
      return res.status(500).json({ message: "Server error.", error: error.message });
  }
};


exports.getArtistBuyArt = async (req, res) => {
  try {
      const { artist_Id } = req.params;

      if (!artist_Id) {
          return res.status(400).json({ message: "Artist ID is required." });
      }

      // Find all artworks added by this artist
      // const artistArts = await Art.find({ artistId: artist_Id, addedBy: "Vendor" }).select('_id');
      const artistArts = await Art.find({ artistId: artist_Id }).select('_id');

      if (!artistArts.length) {
          return res.status(404).json({ message: "No artworks found for this artist." });
      }

      // Extract all matching art IDs
      const artIds = artistArts.map(art => art._id);

      // Find all purchases related to these artworks
      const purchases = await buyArt.find({ art_Id: { $in: artIds } })
          .populate('art_Id', 'art_name price') // Get art details
          .populate('user_Id', 'user_FullName') // Get user details
          .exec();

      return res.status(200).json({
          data: purchases,
          message: "Artist's purchase records fetched successfully.",
          status: 200
      });

  } catch (error) {
      return res.status(500).json({ message: "Server error.", error: error.message });
  }
};



exports.submitReview = async (req, res) => {
  try {
      const { userId, artId, rating, reviewText } = req.body;

      if (!userId || !artId || !rating || !reviewText) {
          return res.status(400).json({ message: "All fields are required." });
      }

      // Check if user has purchased the artwork
      const purchase = await buyArt.findOne({ user_Id: userId, art_Id: artId });

      if (!purchase) {
          return res.status(403).json({ message: "You can only review purchased artworks." });
      }

      // Check if the user has already reviewed this artwork
      const existingReview = await Review.findOne({ userId, artId });
      if (existingReview) {
          return res.status(400).json({ message: "You have already reviewed this artwork." });
      }

      // Save review in the database
      const newReview = new Review({
          userId,
          artId,
          buyArtId: purchase._id, // ✅ Store the related purchase
          rating,
          reviewText
      });

      await newReview.save();

      return res.status(201).json({
          review: newReview,
          message: "Review submitted successfully!",
          status: 200
      });

  } catch (error) {
      return res.status(500).json({ message: "Server error.", error: error.message });
  }
};


// for Artist
exports.getArtistReviews = async (req, res) => {
  try {
      const { artistId } = req.params;

      if (!artistId) {
          return res.status(400).json({ message: "Artist ID is required." });
      }

      // Find all arts created by the artist
      const artistArts = await Art.find({ artistId }).select("_id");
      const artistArtIds = artistArts.map(art => art._id);

      // Find all reviews related to those arts
      const reviews = await Review.find({ artId: { $in: artistArtIds } })
          .populate("userId", "user_FullName email") // Fetch user details
          .populate("artId", "art_name artistId") // Fetch art details
          .populate("buyArtId", "_id") // Include buyArt reference
          .exec();

      return res.status(200).json({
        data: reviews,
          message: "Artist's reviews fetched successfully.",
          status: 200
      });

  } catch (error) {
      return res.status(500).json({ message: "Server error.", error: error.message });
  }
};


// for User
exports.getUserReviews = async (req, res) => {
  try {
      const { userId } = req.params;

      if (!userId) {
          return res.status(400).json({ message: "User ID is required." });
      }

      // Fetch reviews submitted by the user
      const reviews = await Review.find({ userId })
          .populate("artId", "art_name artistId") // Fetch art details
          .populate("buyArtId", "_id") // Include buyArt reference
          .exec();

      return res.status(200).json({
          data: reviews,
          message: "User's reviews fetched successfully.",
          status: 200
      });

  } catch (error) {
      return res.status(500).json({ message: "Server error.", error: error.message });
  }
};