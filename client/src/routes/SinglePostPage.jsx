import Image from "../Components/Image"
import { Link, useParams, useNavigate } from "react-router-dom";
import PostMenuActions from "../Components/PostMenuActions";
import Search from "../Components/Search";
import Comments from "../Components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import React from "react";
import { categories } from "../config/categories";
import CategoryIcon from "../Components/CategoryIcon";

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
    <div className="flex flex-col gap-8 bg-white rounded-2xl shadow-lg p-8">
      {/* detail */}
      <div className="flex gap-8 border-b border-gray-200 pb-8 shadow-sm">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-gray-900">
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
          <p className="text-gray-600 text-lg">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <div className="rounded-xl overflow-hidden shadow-md">
              <Image src={data.img} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* text */}
        <div className="flex-1 lg:text-lg flex flex-col gap-6 text-justify prose prose-lg max-w-none singlePageContent" dangerouslySetInnerHTML={{ __html: data.content}}>
        </div>
        {/* menu */}
        <div className="flex-shrink-0 w-full md:w-50 lg:w-50 xl:w-[250px] h-max sticky top-8">
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
  );
};

export default SinglePostPage;