import mongoose from "mongoose";
import User from "../models/User";
// send mail to receiver of tokens

class pointController {
  constructor() {}

  // @notice send points to a user, with its address
  sendPointsToAUser = async (address: string, points: number) => {
    User.findOneAndUpdate(
      { address: address },
      { $inc: { points: points } },
      { new: true }
    );
  };

  // @notice awards points to a user
  createFreelancerAccount = async (userId: mongoose.Types.ObjectId) => {
    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { points: 5 } },
      { new: true }
    );
  };

  // @notice awards points to a user
  createClientAccount = async (userId: mongoose.Types.ObjectId) => {
    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { points: 7 } },
      { new: true }
    );
  };

  // @notice awards points to a user
  referNewUser = async (userId: mongoose.Types.ObjectId) => {
    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { points: 10 } },
      { new: true }
    );
  };

  // @notice awards points to a user
  completingAJob = async (userId: mongoose.Types.ObjectId) => {
    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { points: 30 } },
      { new: true }
    );
  };

  // @notice awards points to a user
  leavingReviews = async (userId: mongoose.Types.ObjectId) => {
    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { points: 10 } },
      { new: true }
    );
  };

  // @notice awards points to a user
  tweetingAboutXjobs = async (userId: mongoose.Types.ObjectId) => {
    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { points: 15 } },
      { new: true }
    );
  };

  // @notice awards points to a user
  VotingOnProposals = async (userId: mongoose.Types.ObjectId) => {
    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { points: 25 } },
      { new: true }
    );
  };

  // @notice awards points to a user
  GettingAGoodReview = async (userId: mongoose.Types.ObjectId) => {
    User.findOneAndUpdate(
      { _id: userId },
      { $inc: { points: 20 } },
      { new: true }
    );
  };
}

export default new pointController();
