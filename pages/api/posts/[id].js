import dbConnect from "../../../utils/dbconnect";
import Post from "../../../models/Post";

import { getToken } from "next-auth/jwt";
const secret = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (!token) {
    return res.status(201).json({ msg: "unauthorise" });
  }
  var userId = token.sub;
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "DELETE":
      try {
        const { id } = req.query;
        const postToDelete = await Post.findById({ _id: id });
        if (postToDelete.owner.toString() === userId) {
          await Post.findByIdAndDelete(id);
          return res.status(200).json({ success: true, msg: "Postdeleted" });
        }
        res
          .status(200)
          .json({ success: false, msg: "Cannot delete other user post" });
      } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
      }
      break;
    // case "POST":
    //   try {
    //     const { input, imageUrl } = req.body;

    //     const newPostData = {
    //       input,
    //       imageUrl,
    //       owner: id,
    //     };
    //     const post = await Post.create(newPostData);
    //     post.save();
    //     res.status(201).json({ success: true, data: post });
    //   } catch (error) {
    //     res.status(400).json({ success: false, msg: error.message });
    //   }
    //   break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
