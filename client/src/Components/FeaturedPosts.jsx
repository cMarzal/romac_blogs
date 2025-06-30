import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import React, { useState, useEffect } from "react";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=10&sort=newest`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  // Calculate the number of possible positions based on screen size
  const getMaxIndex = () => {
    if (isMobile) {
      return posts.length - 1;
    }
    // On desktop, we show 3 posts at a time
    return Math.max(0, posts.length - 3);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = getMaxIndex();
      return prevIndex === maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = getMaxIndex();
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  const getTransformStyle = () => {
    if (isMobile) {
      return `translateX(-${currentIndex * 100}%)`;
    }
    return `translateX(-${currentIndex * 33.33}%)`;
  };

  // Get the number of dots to show
  const getDotsCount = () => {
    if (isMobile) {
      return posts.length;
    }
    return Math.max(1, posts.length - 2);
  };

  return (
    <div>
      {/* Title Section */}
      <div className="px-4 text-center pb-4 lg:pb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Featured Posts
        </h2>
        <p className="text-gray-600 text-lg md:text-2xl py-3">
          Discover our most important and engaging content
        </p>
      </div>
      {/* Posts Section */}
      <div className="container-full px-4 pb-4 md:px-6">
        <div className="relative flex flex-col justify-start mx-auto h-full rounded-2xl text-center md:justify-between md:px-4 lg:px-2 xl:px-10 2xl:px-14">
          <div className="w-full rounded-3xl bg-gradient-to-br from-purple-900 via-green-700 to-indigo-500">
              <div className="max-w-[1300px] mx-auto">
                <div className="relative w-full rounded-2xl overflow-hidden px-4 pb-8">
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 md:left-6 lg:left-1 xl:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 md:right-6 lg:right-1 xl:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Posts Container */}
                  <div className="relative h-[500px] overflow-hidden px-2 sm:px-4 md:px-6 lg:px-2 xl:px-4">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out h-full"
                      style={{ transform: getTransformStyle() }}
                    >
                      {posts.map((post) => (
                        <div key={post._id} className="min-w-full lg:min-w-[33.33%] h-full flex items-center px-8 lg:px-3 xl:px-6 pt-16 pb-8">
                          <div className="flex flex-col w-full h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="relative h-[150px] rounded-t-xl overflow-hidden">
                              {post.img && (
                                <Image src={post.img} className="object-cover w-full h-full" />
                              )}
                            </div>
                            <div className="flex flex-col flex-1 p-4">
                              <Link to={`/${post.slug}`} className="text-md md:text-xl font-bold hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                                {post.title}
                              </Link>
                              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                                <span>By</span>
                                <Link className="text-blue-600 hover:underline">{post.user.username}</Link>
                                <span>•</span>
                                <span>{format(post.createdAt)}</span>
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-5 mb-4 flex-1">
                                {post.desc}
                              </p>
                              <Link 
                                to={`/${post.slug}`}
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                              >
                                Read More
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {Array.from({ length: getDotsCount() }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentIndex ? "bg-blue-600 w-4" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FeaturedPosts;