import mongoose from "mongoose";

export interface IQuestion extends mongoose.Document {
  title: string;
  questionBody: string;
  tags: mongoose.Schema.Types.ObjectId[];
  views: number;
  upvotes: mongoose.Schema.Types.ObjectId[];
  downvotes: mongoose.Schema.Types.ObjectId[];
  author: mongoose.Schema.Types.ObjectId;
  answers: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

const questionSchema = new mongoose.Schema<IQuestion>({
  title: {
    type: String,
    required: true,
  },
  questionBody: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  views: {
    type: Number,
    default: 0,
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Question =
  mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
