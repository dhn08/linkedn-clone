import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modelAtom";
import { getPostState, handlePostState } from "../atoms/postAtom";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import TimeAgo from "timeago-react";
import { useSession } from "next-auth/react";
import axios from "axios";
const Post = ({ post, modalPost }) => {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [showInput, setShowInput] = useState(false);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setpostState] = useRecoilState(getPostState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [liked, setLiked] = useState(false);
  const truncate = (string, n) => {
    return string?.length > n
      ? string.substr(0, n - 1) + "...see more"
      : string;
  };
  const deletePost = async () => {
    await axios.delete(`/api/posts/${post._id}`);
    setHandlePost(true);
    setModalOpen(false);
  };
  return (
    <div
      className={`bg-white dark:bg-[#1D2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-2 py-2.5 border border-gray-300 dark:border-none`}
    >
      <div className="flex items-center px-2.5 cursor-pointer">
        <Avatar src={post.owner.image} className="!h-10 !w-10 cursor-pointer" />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {post.owner.name}
          </h6>
          <p className="text-sm dark:text-white/75 opacity-80">
            {post.owner.email}
          </p>
          {/* Date diff */}
          <TimeAgo
            datetime={post.createdAt}
            className="text-xs dark:text-white/75 opacity-80"
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>
      {post.input && (
        <div className="px-2.5 break-all md:break-normal">
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{post.input}</p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}
      {post.imageUrl && !modalPost && (
        <img
          src={post.imageUrl}
          alt="post-image"
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setpostState(post);
          }}
        />
      )}
      <div className="flex justify-evenly items-center dark:border-t border-gray-600/80 mx-2.5 pt-2 text-black/80 dark:text-white/75">
        {modalPost ? (
          <button className="postButton">
            <CommentOutlinedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && "text-blue-500"}`}
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            )}
            Like
          </button>
        )}
        {session?.user?.email === post.owner.email ? (
          <button
            onClick={deletePost}
            className="postButton focus:text-red-400"
          >
            <DeleteRoundedIcon />
            <h4>Delete Post</h4>
          </button>
        ) : (
          <button className="postButton">
            <ReplyRoundedIcon className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
