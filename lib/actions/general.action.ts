"use server";

import Question from "@/DB/question.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import User from "@/DB/user.model";
import Answer from "@/DB/answer.model";
import Tag from "@/DB/tag.model";

const searchableTypes = ['question', 'user', 'answer', 'tag'];

export async function globalSearch(data : SearchParams) {
    try {
        connectToDatabase();
        const {query, type} = data;

        const ourQuery = {$regex: query, $options: 'i'};

        let results: { title: any; type: string | null | undefined; id: any; }[] = [];

        const filterAndType = [
            {model: Question, searchField: 'title', type: 'question'},
            {model: User, searchField: 'name', type: 'user'},
            {model: Answer, searchField: 'answerBody', type: 'answer'},
            {model: Tag, searchField: 'name', type: 'tag'}
        ]

        const lowerType = type?.toLowerCase();

        if(!lowerType || !searchableTypes.includes(lowerType)) {
            //search in all models
            for(const {model, searchField, type} of filterAndType) {
                const queryResults = await model.find({[searchField]: ourQuery}).limit(2);
                results.push(...queryResults.map(item => ({
                    title: type==='answer' ? `Answers containing ${query}` : item[searchField],
                    type,
                    id: type==='user' ? item.clerkId : type==='answer' ? item.question : item._id
                })))
            }
        }
        else {
            //search in the specified model type
            const model = filterAndType.find(item => item.type === lowerType);
            if(!model) throw new Error('Invalid type');

            const queryResults = await model.model.find({[model.searchField]: ourQuery}).limit(8);
            results = queryResults.map(item => ({
                title: type==='answer' ? `Answers containing ${query}` : item[model.searchField],
                type,
                id: type==='user' ? item.clerkId : type==='answer' ? item.question : item._id
            }))
        }
        return JSON.stringify(results);

    } catch (error) {
        console.log(error);
        throw error;
    }
}