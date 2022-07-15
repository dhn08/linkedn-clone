import dbConnect from "../../../utils/dbconnect";
import Post from "../../../models/Post";
import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";
const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });

  await dbConnect();
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const posts = await Post.find({}).sort({ _id: -1 }).populate("owner");
        res.status(200).json({ success: true, posts });
      } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
      }
      break;
    case "POST":
      try {
        const { input, imageUrl } = req.body;
        if (!token) {
          return res.status(201).json({ msg: "unauthorise" });
        }
        var id = mongoose.Types.ObjectId(token.sub);
        const newPostData = {
          input,
          imageUrl,
          owner: id,
        };
        const post = await Post.create(newPostData);
        post.save();
        res.status(201).json({ success: true, post });
      } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

//const token = await getToken({ req, secret });
