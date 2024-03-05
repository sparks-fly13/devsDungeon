"use server";

import User from "@/DB/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/DB/question.model";

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

    //TODO: Delete user's answers, comments etc.

    //Delete User
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
