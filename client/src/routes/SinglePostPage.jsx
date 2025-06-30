import Image from "../components/Image"
import { Link, useParams, useNavigate } from "react-router-dom";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import React from "react";
import { categories } from "../config/categories";
import CategoryIcon from "../components/CategoryIcon";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";

  const handleCategoryClick = (categoryId) => {
    if (categoryId) {
      navigate(`/posts?cat=${categoryId}`);
    } else {
      navigate("/posts");
    }
  };

  return (
    <div className="px-2 md:px-8 lg:px-16 xl:px-28 2xl:px-32">
      <div className="flex flex-col border-1 border-gray-400 gap-8 bg-white rounded-2xl shadow-lg px-4 md:px-8 mt-[calc(var(--navbar-height)+32px)] mb-8">
        {/* image for small screens */}
        {data.img && (
          <div className="block lg:hidden w-full pt-8">
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image src={data.img} className="w-full h-auto object-cover" />
            </div>
          </div>
        )}
        {/* detail */}
        <div className="flex flex-col pb-2 lg:py-8 gap-4">
          <div className="flex flex-row">
            <div className="lg:w-2/3 flex flex-col gap-4 lg:gap-6">
              <h1 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-gray-900">
                {data.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span>Written by</span>
                <Link className="text-blue-600 hover:underline">{data.user.username}</Link>
                <span>•</span>
                {data.categories.map((category, index) => (
                  <React.Fragment key={category}>
                    <Link className="text-blue-600 hover:underline" to={`/posts?cat=${category}`}>
                      {categories.find(c => c.id === category)?.name || category}
                    </Link>
                    {index < data.categories.length - 1 && <span>,</span>}
                  </React.Fragment>
                ))}
                <span>•</span>
                <span>{format(data.createdAt)}</span>
              </div>
            </div>
            {/* image for large screens */}
            {data.img && (
              <div className="hidden lg:block w-1/3">
                <div className="rounded-xl overflow-hidden shadow-md">
                  <Image src={data.img} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
          <p className="flex text-gray-700 text-lg md:text-xl">
            {data.desc}
          </p>
        </div>
        {/* horizontal bar */}
        <hr className="border-t-2 border-gray-200" />
        {/* content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* text */}
          <div className="flex-1 text-md lg:text-md flex flex-col gap-6 text-justify prose prose-lg max-w-none singlePageContent" dangerouslySetInnerHTML={{ __html: data.content}}>
          </div>
          {/* menu */}
          <div className="flex-shrink-0 w-full lg:w-50 xl:w-[250px] h-max sticky top-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg border-2 border-blue-100 hover:shadow-xl transition-all duration-300">
              <h2 className="mb-4 text-lg font-bold text-blue-900 flex items-center gap-2">
                <span>✍️</span> Meet the Author
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {data.user.img && data.user.img.trim() != "" && (
                    <img
                      src={data.user.img}
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-200 hover:ring-blue-300 transition-all duration-300 transform hover:scale-110"
                    />
                  )}
                  <Link className="text-blue-600 hover:text-blue-800 font-semibold text-lg hover:underline transition-colors duration-300">{data.user.username}</Link>
                </div>
              </div>
              <hr className="my-2 border-t-2 border-blue-100" />
              <PostMenuActions post={data}/>
              <hr className="my-2 border-t-2 border-blue-100" />
              <h2 className="mb-4 text-lg font-bold text-blue-900 flex items-center gap-2">
                <span>🔎</span> Search
              </h2>
              <Search />
              <hr className="my-4 border-t-2 border-blue-100" />
              <h2 className="mb-4 text-lg font-bold text-blue-900 flex items-center gap-2">
                <span>📑</span> Categories
              </h2>
              <div className="flex flex-col">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className="flex items-center gap-3 p-1.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-red-50 hover:text-red-700">
                    <CategoryIcon icon={category.icon} />
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Comments postId={data._id}/>
      </div>
    </div>
  );
};

export default SinglePostPage;