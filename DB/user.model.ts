import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  clerkID: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  profilePic: string;
  location?: string;
  portfolioLink?: string;
  reputation?: number;
  saved: mongoose.Schema.Types.ObjectId[];
  joinedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  clerkID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePic: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  portfolioLink: {
    type: String,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
