"use server";

import Answer from "@/DB/answer.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/DB/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(data: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { author, answerBody, question, path } = data;
    const answer = await Answer.create({ question, author, answerBody });

    //Add the answer to question model's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    //TODO: Add interaction

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(data: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId } = data;
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name avatar")
      .sort({ createdAt: -1 });
    return answers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
