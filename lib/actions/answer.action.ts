"use server";

import Answer from "@/DB/answer.model";
import { connectToDatabase } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/DB/question.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/DB/interaction.model";
import User from "@/DB/user.model";

export async function createAnswer(data: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { author, answerBody, question, path } = data;
    const answer = await Answer.create({ question, author, answerBody });

    //Add the answer to question model's answers array
    const questionObj = await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    //TODO: Add interaction
    await Interaction.create({
      user: author,
      action: "answer",
      question,
      answer: answer._id,
      tags: questionObj.tags,
    })

    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 10 }
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(data: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId, sortBy, page=1, pageSize=5 } = data;
    const skipBy = (page - 1) * pageSize;

    let sorting = {};

    switch (sortBy) {
      case "highest_upvotes":
        sorting = { upvotes: -1 };
        break;
      case "lowest_upvotes":
        sorting = { upvotes: 1 };
        break;
      case "recent":
        sorting = { createdAt: -1 };
        break;
      case "old":
        sorting = { createdAt: 1 };
        break;
      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name avatar")
      .sort(sorting)
      .skip(skipBy)
      .limit(pageSize);
    
    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const isNext = totalAnswers > skipBy + answers.length;

    return {answers, isNext};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(data: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasdownVoted, hasupVoted, path } = data;

    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) {
      throw new Error("Answer  not found");
    }
    // Increase author's reputation for upvote/downvote
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -2 : 2 }
    });
    //+10 for receiving an upvote -10 for receiving a downvote
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 }
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(data: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasdownVoted, hasupVoted, path } = data;

    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: {
          downvotes: userId
        }
      }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) {
      throw new Error("Answer  not found");
    }
    // Decrease author's reputation
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? 2 : -2 }
    });
    //+10 for receiving an upvote -10 for receiving a downvote
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasdownVoted ? 10 : -10 }
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAnswer(data: DeleteAnswerParams) {
  try {
    connectToDatabase();
    const { answerId, path } = data;
    const answer = await Answer.findById({ _id: answerId });
    if(!answer) throw new Error('Answer not found');
    await Question.updateMany({_id: answer.question}, {$pull: {answers: answerId}});
    await Interaction.deleteMany({answer: answerId});
    await Answer.deleteOne({_id: answerId});

    revalidatePath(path);

  } catch (error) {
    console.log(error);
    throw error;
  }
}