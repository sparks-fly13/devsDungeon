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
    const {searchQuery, filter, page=1, pageSize} = data;
    const skipBy = (page - 1) * pageSize;

    const query : FilterQuery<typeof Tag> = {};

    if(searchQuery) {
      query.$or = [
        {name: { $regex: new RegExp(searchQuery, `i`)}}
      ]
    }

    let sorting = {};

    switch (filter) {
      case "popular":
        sorting = {questions: -1}
        break;
      case "recent":
        sorting = {createdAt: -1}
        break;
      case "name":
        sorting = {name: 1}
        break;
      case "old":
        sorting = {createdAt: 1}
        break;
      default:
        break;
    }

    const tags = await Tag.find(query).sort(sorting).skip(skipBy).limit(pageSize);
    const totalTags = await Tag.countDocuments(query);
    const isNext = totalTags > skipBy + tags.length;

    return {tags, isNext};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(data: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const {tagId, page=1, pageSize, searchQuery} = data;
    const skipBy = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = {_id: tagId};
    

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery ? {title: {$regex: searchQuery, $options: 'i'}} : {},
      options: {
        sort: {createdAt: -1},
        skip: skipBy,
        limit: pageSize+1
      },
      populate: [
        {path: 'tags', model: Tag, select: '_id name' },
        {path: 'author', model: User, select: '_id clerkId name avatar'}
      ]
    });

    if(!tag) throw new Error("Tag not found");

    const isNext = tag.questions.length > pageSize;

    const questions = tag.questions;
    // console.log("Tag in server function" + "   " + tag);
    // console.log(tag.questions[0].tags);
    // console.log(tag.questions[0].author);
    return {
      tagName: tag.name,
      questions,
      isNext
    };

  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPopularTags() {
  try {
    connectToDatabase();
    //questions is an array
    const tags = await Tag.aggregate([
      {
        $addFields: {
          questionsCount: { $size: "$questions" }
        }
      },
      {
        $sort: { questionsCount: -1 }
      },
      {
        $limit: 5
      }
    ]);
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}