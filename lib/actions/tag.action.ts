"use server";

import User from "@/DB/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag, { ITag } from "@/DB/tag.model";
import Question from "@/DB/question.model";
import { FilterQuery } from "mongoose";

export async function getTopTags(data: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = data;
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    //Find user interactions and group them by tags

    return [
      {
        _id: "1",
        name: "OS",
      },
      {
        _id: "2",
        name: "MacOS",
      },
      {
        _id: "3",
        name: "Javascript",
      },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(data: GetAllTagsParams) {
  try {
    connectToDatabase();
    const tags = await Tag.find({});
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(data: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const {tagId, page=1, pageSize=10, searchQuery} = data;

    const tagFilter: FilterQuery<ITag> = {_id: tagId};
    

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery ? {title: {$regex: searchQuery, $options: 'i'}} : {},
      options: {
        sort: {createdAt: -1},
      },
      populate: [
        {path: 'tags', model: Tag, select: '_id name' },
        {path: 'author', model: User, select: '_id clerkId name avatar'}
      ]
    });

    if(!tag) throw new Error("Tag not found");

    const questions = tag.questions;
    // console.log("Tag in server function" + "   " + tag);
    // console.log(tag.questions[0].tags);
    // console.log(tag.questions[0].author);
    return {
      tagName: tag.name,
      questions
    };

  } catch (error) {
    console.log(error);
    throw error;
  }
}