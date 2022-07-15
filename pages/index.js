import { AnimatePresence } from "framer-motion";
import { getSession, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modelAtom";
import axios from "axios";
import Widgets from "../components/Widgets";
export default function Home({ posts, articles }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | Linkedin</title>
        <meta name="description" content="Linkein clone" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          <Feed posts={posts} />
        </div>
        <Widgets articles={articles} />
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  //Get posts on SSR
  const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/posts`);
  const { posts } = data;
  //Google news
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`
  );
  const articles = response.data.articles;

  return {
    props: { session, posts, articles }, // will be passed to the page component as props
  };
}
