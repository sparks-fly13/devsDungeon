import mongoose from "mongoose";

export interface IAnswer extends mongoose.Document {
  author: mongoose.Schema.Types.ObjectId;
  question: mongoose.Schema.Types.ObjectId;
  answerBody: string;
  upvotes: mongoose.Schema.Types.ObjectId[];
  downvotes: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

const answerSchema = new mongoose.Schema<IAnswer>({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answerBody: {
    type: String,
    required: true,
  },
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer =
  mongoose.models.Answer || mongoose.model<IAnswer>("Answer", answerSchema);

export default Answer;
