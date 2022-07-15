import React from "react";
import Image from "next/image";
import HeaderLink from "../components/HeaderLink";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
function Home({ providers }) {
  return (
    <div className="space-y-10 relative">
      <Head>
        <title>Linkedin</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <header className="flex justify-around items-center py-4">
        <div className="relative w-36 h-16">
          <Image
            src="/logo2.png"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={OndemandVideoSharpIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
          </div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <div className="pl-4">
                <button
                  type="button"
                  className="text-blue-500 rounded-full font-semibold border border-blue-500 px-5 py-1.5 transition-all hover:border-2"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign In
                </button>
              </div>
            </div>
          ))}
          {/* <div className="pl-4">
            <button
              type="button"
              className="text-blue-500 rounded-full font-semibold border border-blue-500 px-5 py-1.5 transition-all hover:border-2"
            >
              Sign In
            </button>
          </div> */}
        </div>
      </header>
      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0">
            Welcome to your professional communnity
          </h1>
          <div className="space-y-4">
            <div className="intent">
              <h2 className="text-xl">Search for a Job</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative  w-80 h-80 xl:absolute xl:w-[650px] xl:h-[650px] xl:top-14 xl:right-14">
          <Image src="/homeimg.svg" layout="fill" priority />
        </div>
      </main>
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers }, // will be passed to the page component as props
  };
}
