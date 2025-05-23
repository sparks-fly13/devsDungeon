"use server";

import Question from "@/DB/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/DB/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/DB/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/DB/answer.model";
import Interaction from "@/DB/interaction.model";
import { FilterQuery } from "mongoose";

export async function getQuestions({searchQuery, filter, page = 1, pageSize}: GetQuestionsParams) {
  try {
    connectToDatabase();

    //amount of pages to skip according to page number and size
    const skipBy = (page - 1) * pageSize;

    const query : FilterQuery<typeof Question> = {};
    
    if(searchQuery){
      query.$or = [
        {title: { $regex: new RegExp(searchQuery, `i`)}},
        {questionBody: { $regex: new RegExp(searchQuery, `i`)}}
      ]
    }

    let sorting = {};

    switch (filter) {
      case "newest":
        sorting = {createdAt: -1};
        break;
      case "upvotes":
        sorting = {upvotes: -1};
        break;
      case "frequent":
        sorting = {views: -1};
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        break;
    }

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(skipBy)
      .limit(pageSize)
      .sort(sorting);
    //count total number of questions
    const totalQuestions = await Question.countDocuments(query);

    const isNext = totalQuestions > skipBy + questions.length;

    return {questions, isNext};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(data: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, questionBody, tags, author, path } = data;

    // Create a new question
    const question = await Question.create({
      title,
      questionBody,
      author,
    });

    const tagDocuments = [];

    //create tags if they don't exist. Get them if they exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, `i`) } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    // Add tags to question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction for the user's ask_question action
    await Interaction.create({
      user: author,
      action: "ask_question",
      question: question._id,
      tags: tagDocuments
    });

    // Increment user's reputation by +5 for creating a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(data: GetQuestionByIdParams) {
  try {
    connectToDatabase();
    const { questionId } = data;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name avatar",
      });
    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteQuestion(data: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { questionId, userId, hasdownVoted, hasupVoted, path } = data;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Question  not found");
    }
    // Increase author's reputation -> +1 for upvote -1 for downvote and revoke upvote/downvote
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1 }
    })
    //+10 for receiving an upvote -10 for receiving a downvote
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 }
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(data: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { questionId, userId, hasdownVoted, hasupVoted, path } = data;

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

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Question  not found");
    }
    // Decrease author's reputation
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? 1 : -1 }
    });
    //+10 for receiving an upvote -10 for receiving a downvote
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasdownVoted ? 10 : -10 }
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteQuestion(data: DeleteQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, path } = data;
    await Question.deleteOne({_id: questionId});
    await Answer.deleteMany({question: questionId});
    await Interaction.deleteMany({question: questionId});
    await Tag.updateMany({questions: questionId}, {$pull: {questions: questionId}});
    revalidatePath(path);

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editQuestion(data: EditQuestionParams) {
  try{
    connectToDatabase();
    const {questionId, title, questionBody, path} = data;
    const question = await Question.findById(questionId).populate("tags");
    if(!question) throw new Error("Question was not found");
    question.title = title;
    question.questionBody = questionBody;
    await question.save();

    revalidatePath(path);

  } catch(error){
    console.log(error);
    throw error;
  }
}

export async function getTopQuestions() {
  try {
    connectToDatabase();
    const topQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);
    return topQuestions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}