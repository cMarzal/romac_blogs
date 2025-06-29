import { Link, useNavigate } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const PostListAdminItem = ({ post }) => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      navigate(0);
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const queryClient = useQueryClient();

  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const publishMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/publish`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handlePublish = () => {
    publishMutation.mutate();
  };

  const handleFeature = () => {
    featureMutation.mutate();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <article className="group relative flex flex-col md:flex-row gap-8 py-4 border-b border-gray-500 last:border-0 shadow-sm bg-white rounded-lg p-3 hover:bg-gray-50 transition-colors">
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

        <p className="text-gray-600 text-base mb-6 line-clamp-2">
          {post.desc}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            <Link 
              to={`/${post.slug}`} 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Read article →
            </Link>
            <Link 
              to={`/edit/${post.slug}`} 
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Edit →
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={handlePublish} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <i className={`fa-solid ${post.isPublished ? "fa-eye" : "fa-eye-slash"}`} />
              <span>{post.isPublished ? "Published" : "Draft"}</span>
              {publishMutation.isPending && (
                <span className="text-xs text-gray-400">(updating...)</span>
              )}
            </button>
            
            <button onClick={handleFeature} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <i className={`fa-solid ${post.isFeatured ? "fa-star" : "fa-star"}`} />
              <span>{post.isFeatured ? "Featured" : "Not Featured"}</span>
              {featureMutation.isPending && (
                <span className="text-xs text-gray-400">(updating...)</span>
              )}
            </button>
            
            <button onClick={handleDelete} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 transition-colors">
              <i className="fa-solid fa-trash" />
              <span>Delete</span>
              {deleteMutation.isPending && (
                <span className="text-xs text-gray-400">(deleting...)</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostListAdminItem;