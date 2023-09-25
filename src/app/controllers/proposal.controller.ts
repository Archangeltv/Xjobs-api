import { Request } from "express";
import Gig from "../models/Gig";
import Proposal from "../models/Proposal";
import User from "../models/User";

class proposalController {
  // @notice create a new proposal
  createNewProposal = async (req: Request) => {
    const { gigId, freelancerId, coverLetter } = req.body;
    try {
      const gig = await Gig.findById(gigId);
      if (gig) {
        const proposal = await Proposal.create({
          freelancerId: freelancerId,
          gigId: gigId,
          coverLetter: coverLetter,
        });

        if (proposal) {
          const propId = proposal._id.toString();

          await Promise.all([
            gig.proposals.push(proposal),
            User.findByIdAndUpdate(
              {
                _id: freelancerId,
              },
              { $addToSet: { submittedProposals: propId } }
            ),
          ]);

          await gig.save();
        } else {
          return "error saving proposal";
        }

        return "successfully create proposal";
      }
    } catch (error) {
      return error;
    }
  };

  // @notice get a proposal with a given id
  getAProposal = async (req: Request) => {
    const { gigId } = req.body;
    try {
      await Gig.findById(gigId).populate({
        path: "proposals",
        populate: { path: "freelancerId", model: "User" },
      });
    } catch (error) {
      return { message: "error getting proposal" };
    }
  };

  // @notice get a job proposal with a given id
  getJobProposal = async (req: Request) => {
    const { gigId } = req.body;
    try {
      const proposal = await Gig.findById(gigId)
        .populate("awardedFreelancer")
        .populate({
          path: "proposals",
          populate: { path: "freelancerId", model: "User" },
        });
      return proposal;
    } catch (error) {
      return { message: "error getting proposal" };
    }
  };

  // @notice accept a proposal with a given id
  acceptProposal = async (req: Request) => {
    const { id } = req.body;
    try {
      await Proposal.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            accepted: true,
          },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      return { message: "error accepting proposal" };
    }
  };

  // @notice check if a proposal exists
  checkIfProposalExists = async (req: Request) => {
    const { freelancerId, gigID } = req.body;

    await Proposal.findOne({
      freelancerId: freelancerId,
      gigId: gigID,
    })
      .select("_id")
      .then((res) => {
        if (res._id) {
          const user = User.findById(freelancerId).then((user) => {
            const propId = res._id.toString();
            const subProp = user.submittedProposals;
            if (subProp.includes(propId)) {
              return { message: "user has already applied" };
            }
          });
          return user;
        }
      })
      .then((proposal) => {
        return proposal;
      })
      .catch((error) => {
        return error;
      });
  };

  // @notice update a proposal with a given id
  updateProposalConversationID = async (req: Request) => {
    const { id, conversationID } = req.body;

    try {
      const proposal = await Proposal.findOneAndUpdate(
        { _id: id },
        { conversationID: conversationID },
        {
          new: true,
        }
      );
      return proposal;
    } catch (error) {
      return { message: `error updating proposal conversation id ${id}` };
    }
  };

  // @notice get a proposal with a given id
  getProposalById = async (req: Request) => {
    const { id } = req.query;
    const proposals = await Proposal.find({
      freelancerId: id,
    })
      .populate("gigId")
      .sort({ $natural: -1 });

    return proposals;
  };

  // @notice get proposal for a gig
  getProposalsForGig = async (req: Request) => {
    const { gigId } = req.body;
    try {
      const proposal = await Proposal.findById(gigId).populate({
        path: "proposals",
        populate: { path: "freelancerId", model: "User" },
      });
      return proposal;
    } catch (error) {
      return { message: `error getting proposal for ${gigId}` };
    }
  };
}

export default new proposalController();
