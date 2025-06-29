import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";
import React from "react";
import './PostListItem.css';

const PostListItem = ({ post }) => {
  return (
    <article className="postlistitem-hover-bg group relative flex flex-col md:flex-row gap-8 py-4 last:border-0 shadow-sm bg-white rounded-lg p-3 transition-colors">
      {/* Image */}
      {post.img && (
        <div className="md:w-1/3">
          <div className="relative overflow-hidden rounded-lg aspect-[16/9] shadow-md">
            <Image 
              src={post.img} 
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="md:w-2/3 flex flex-col">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>{format(post.createdAt)}</span>
          <span>•</span>
          {post.categories.map((category, index) => (
            <React.Fragment key={category}>
              <Link 
                className="hover:text-blue-600 transition-colors" 
                to={`/posts?cat=${category}`}
              >
                {category}
              </Link>
              {index < post.categories.length - 1 && <span>,</span>}
            </React.Fragment>
          ))}
        </div>

        <Link 
          to={`/${post.slug}`} 
          className="text-2xl md:text-3xl font-medium text-gray-900 hover:text-blue-600 transition-colors mb-4 group-hover:underline"
        >
          {post.title}
        </Link>

        <p className="text-gray-600 text-base mb-6 line-clamp-2 group-hover:text-white">
          {post.desc}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <Link 
            to={`/${post.slug}`} 
            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:text-white"
          >
            Read Blog
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transform transition-transform group-hover:translate-x-1 group-hover:text-white" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </Link>
          <span className="text-sm text-gray-500 group-hover:text-white">
            By {post.user.username}
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostListItem;