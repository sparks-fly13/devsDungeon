"use server";

import Question from "@/DB/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/DB/tag.model";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
} from "./shared.types";
import User from "@/DB/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return {
      questions,
    };
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
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    // Add tags to question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction for the user's ask_question action

    // Increment user's reputation by +5 for creating a question

    revalidatePath(path);
  } catch (error) {}
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
