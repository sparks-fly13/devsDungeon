import mongoose from "mongoose";

export interface ITag extends mongoose.Document {
  name: string;
  description?: string;
  questions: mongoose.Schema.Types.ObjectId[];
  followers: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

const tagSchema = new mongoose.Schema<ITag>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  followers: [
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

const Tag = mongoose.models.Tag || mongoose.model<ITag>("Tag", tagSchema);

export default Tag;
