"use server";

import User from "@/DB/user.model";
import Tag from "@/DB/tag.model";
import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/DB/question.model";
import Answer from "@/DB/answer.model";

export async function getUserById(data: GetUserByIdParams) {
  try {
    connectToDatabase();
    const { userId } = data;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user by ID");
  }
}

export async function createUser(data: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(data);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(data: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = data;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(data: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = data;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    //Delete user from database, his questions, answers, comments etc.

    //get the questions' ID of the user
    // const userQuestionsId = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    //delete the user's questions
    await Question.deleteMany({ author: user._id });

    //TODO: Delete user's answers, comments, tags etc.

    //Delete User
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(data: GetAllUsersParams) {
  try {
    connectToDatabase();
    // const {page=1, pageSize=20, searchQuery,filter} = data;
    const users = await User.find({}).sort({ createdAt: -1 });
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSavedQuestion(data: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();
    const { userId, questionId, path } = data;
    const user = await User.findById(userId);
    if(!user) throw new Error("User not found");

    const isSaved = user.saved.includes(questionId);
    if(isSaved){
      await User.findByIdAndUpdate(userId, {$pull: {saved: questionId}}, {new: true});
    }else{
      await User.findByIdAndUpdate(userId, {$addToSet: {saved: questionId}}, {new: true});
    }
    revalidatePath(path);
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(data: GetSavedQuestionsParams) {
  try {
    connectToDatabase();
    const {clerkId, page=1, pageSize=10, filter, searchQuery} = data;

    const query: FilterQuery<typeof Question> = searchQuery ? {title: {$regex: new RegExp(searchQuery, 'i')}} : {};

    const user = await User.findOne({ clerkId }).populate({
      path: 'saved',
      match: query,
      options: {
        sort: {createdAt: -1},
      },
      populate: [
        {path: 'tags', model: Tag, select: '_id name' },
        {path: 'author', model: User, select: '_id clerkId name avatar'}
      ]
    });

    if(!user) throw new Error("User not found");

    const savedQuestions = user.saved;
    return savedQuestions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserProfileData(data: GetUserByIdParams) {
  try {
    connectToDatabase();
    const { userId } = data; //we get clerkId from useAuth hook here

    const user = await User.findOne({ clerkId: userId });
    if(!user) throw new Error("User not found");

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return {
      user,
      totalQuestions,
      totalAnswers
    }

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(data: GetUserStatsParams) {
  try {
    connectToDatabase();
    const {userId, page=1, pageSize=10} = data;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({author: userId})
      .sort({views: -1, upvotes: -1})
      .populate('tags', '_id name')
      .populate('author', '_id clerkId name avatar');

      return {
        totalQuestions,
        userQuestions
      }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(data: GetUserStatsParams) {
  try {
    connectToDatabase();
    const {userId, page=1, pageSize=10} = data;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    const userAnswers = await Answer.find({author: userId})
      .sort({upvotes: -1})
      .populate('question', '_id title')
      .populate('author', '_id clerkId name avatar');

      return {
        totalAnswers,
        userAnswers
      }
  } catch (error) {
    console.log(error);
    throw error;
  }
}