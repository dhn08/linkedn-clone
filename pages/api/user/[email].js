import dbConnect from "../../../utils/dbconnect";
import User from "../../../models/user";
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { email } = req.query;
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
          return res
            .status(200)
            .json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // case "POST":
    //   try {
    //     const user = await User.create(req.body);
    //     res.status(201).json({ success: true, data: user });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
