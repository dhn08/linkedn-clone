import React, { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modelAtom";
import { handlePostState } from "../atoms/postAtom";

const Form = () => {
  const [input, setinput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const uploadPost = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/posts", {
      input,
      imageUrl: photoUrl,
    });
    setHandlePost(true);
    setModalOpen(false);
  };
  return (
    <form
      onSubmit={uploadPost}
      className="flex flex-col relative space-y-2 text-black/80 dark:text-white/80"
    >
      <textarea
        rows="4"
        placeholder="What do you want to talk about"
        className="bg-transparent focus:outline-none dark:placeholder-white/75"
        value={input}
        onChange={(e) => setinput(e.target.value)}
      />
      <input
        type="text"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
        placeholder="Add a photo url (optional)"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button
        type="sumbit"
        className="absolute bottom-0 right-0 font-medium cursor-pointer bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5"
        disabled={!input.trim() && !photoUrl.trim()}
      >
        Post
      </button>
    </form>
  );
};

export default Form;
