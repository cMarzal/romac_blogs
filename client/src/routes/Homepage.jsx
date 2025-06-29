import { Link } from "react-router-dom"
import Image from "../Components/Image";
import FeaturedPosts from "../Components/FeaturedPosts";
import PostList from "../Components/PostList";
import { useUser } from "@clerk/clerk-react";


const Homepage = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  return (
    <div className="flex flex-col gap-4">
      {/* INTRO */}
      <div className="relative w-screen left-[50%] right-[50%] mx-[-50vw]">
        <div className="container box-border !max-w-[1672px] !px-6 lg:!px-9">
          <div className="w-full rounded-3xl bg-gradient-to-br from-purple-900 via-green-700 to-indigo-500">
              <div className="max-w-[1300px] mx-auto">
                <div className="flex flex-col items-center">
                  {/* TITLE */}
                  <div className="space-y-6 px-4 text-center">
                    <h1 className="text-white text-center text-6xl lg:text-7xl pt-20 pb-6 font-bold">
                      Data and Cybersecurity with<br/>
                      Romac Blogs
                    </h1>
                    <p className="text-white text-md lg:text-xl leading-relaxed text-center">
                      Hi! I'm Carlos, an engineer with over 5 years of experience in the tech industry.
                      This page will show my progress and ideas regarding the tech industry, specifically Cybersecurity and Data.
                      I have worked in the industry working on Data Pipelines and SIEMs for most of my career, with experience also in frontend and Data Analysis and Visualization.
                      Join me on this journey as we explore the ever-evolving landscape of technology together.
                    </p>
                  </div>
                  {/* SOCIAL LINKS  */}
                  <div className="flex flex-col items-center space-y-4 px-4 pt-12 pb-8">
                    <p className="text-white/80 text-sm text-center">
                      Connect with me on social media
                    </p>
                    <div className="flex space-x-6">
                      {/* LinkedIn */}
                      <a 
                        href="https://www.linkedin.com/in/carlos-marzal/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 border border-white/20"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span className="text-white font-medium">LinkedIn</span>
                      </a>
                      
                      {/* GitHub */}
                      <a 
                        href="https://github.com/cMarzal" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 border border-white/20"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span className="text-white font-medium">GitHub</span>
                      </a>

                      {/* Email */}
                      <a 
                        href="mailto:cmr.maro@gmail.com" 
                        className="group flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 border border-white/20"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-white font-medium">Email</span>
                      </a>
                    </div>
                  </div>
                  {/* ANIMATED BUTTON */}
                  {user && role === "admin" && (
                    <Link to="write" className="hidden md:block relative">
                      <svg viewBox="0 0 200 200" width="200" height="200" className="text-lg tracking-widest animate-spin animatedButton">
                        <path id="circlePath" fill="none" d="M 100, 100 m -75, 0 a 75, 75 0 1,1 150,0 a 75,75 0 1,1 -150,0"/>
                        <text>
                        <textPath href="#circlePath" startOffset="0%">Write Your Story</textPath>
                        <textPath href="#circlePath"startOffset="50%">Share Your Idea</textPath>
                        </text>
                      </svg>
                      <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 rounded-full flex items-center justify-center">
                        <Image src="logo_nb.png" alt="logo" w={100} h={100}/>
                      </button>   
                    </Link>
                  )}
                </div>
              </div>
          </div>
        </div>
      </div>
      {/* FEATURED POSTS */}
      <FeaturedPosts />
      {/* POST LIST */}
        <div className="flex flex-col">
          {/* Recent Posts Title */}
          <div className="text-center pt-8 lg:pt-24 pb-4 lg:pb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Recent Posts
            </h2>
            <p className="text-gray-600 text-lg md:text-2xl py-3">
              Stay updated with our latest articles and insights
            </p>
          </div>
          <PostList />
        </div>
    </div>
  )
}

export default Homepage