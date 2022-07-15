import mongoose from "mongoose";
import User from "./User";
const PostSchema = new mongoose.Schema(
  {
    input: String,
    imageUrl: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
