"use server"

import Question from "@/DB/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/DB/interaction.model";

export async function viewQuestion(data: ViewQuestionParams) {
    try {
        connectToDatabase();

        const { questionId, userId } = data;
        await Question.findByIdAndUpdate(questionId, { $inc: { views: 0.5 } });
        if(userId) {
            const existingInteraction = await Interaction.findOne({ user: userId, question: questionId, action: 'view' });
            if(!existingInteraction) {
                await Interaction.create({ user: userId, question: questionId, action: 'view' });
            } else return console.log('User already viewed this question');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}