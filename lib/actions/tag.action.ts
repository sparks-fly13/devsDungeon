"use server";

import User from "@/DB/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

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
