import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostMenuActions = ({ post }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const isAdmin = user?.publicMetadata?.role === "admin" || false;

  const isSaved = savedPosts?.data?.some((p) => p === post._id) || false;


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
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
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
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleFeature = () => {
    featureMutation.mutate();
  };

  const handlePublish = () => {
    publishMutation.mutate();
  };

  const handleSave = () => {
    if (!user) {
      return navigate("/login");
    }
    saveMutation.mutate();
  };

  const handleEdit = () => {
    navigate(`/edit/${post.slug}`);
  };

  return (
    <div className="mt-4">
      <h2 className="mb-4 text-lg font-bold text-blue-900 flex items-center gap-2">
        <i className="fa-solid fa-list-ul text-blue-500"></i>
        Post Actions
      </h2>
      {isPending ? (
        <div className="flex items-center gap-1.5 py-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-sm text-red-500 py-2">
          <i className="fa-solid fa-triangle-exclamation mr-2"></i>
          Login to save or edit the post
        </div>
      ) : (
        <div 
          className="flex items-center gap-3 p-1.5 cursor-pointer hover:bg-white rounded-lg transition-all duration-200" 
          onClick={handleSave}
        >
          <i className={`
            ${saveMutation.isPending 
              ? isSaved 
                ? "fa-regular fa-bookmark animate-pulse" 
                : "fa-solid fa-bookmark animate-pulse"
              : isSaved 
                ? "fa-solid fa-bookmark text-blue-500" 
                : "fa-regular fa-bookmark"
            }
          `}/>
          <span className="font-medium">{isSaved ? "Saved" : "Save this Post"}</span>
          {saveMutation.isPending && (
            <span className="text-xs text-gray-400 italic">(saving...)</span>
          )}
        </div>
      )}
      {isAdmin && (
        <div 
        className="flex items-center gap-3 p-1.5 cursor-pointer hover:bg-white rounded-lg transition-all duration-200" 
        onClick={handleFeature}
        >
          <i className={`
            ${featureMutation.isPending
              ? post.isFeatured
                ? "fa-regular fa-star animate-pulse"
                : "fa-solid fa-star animate-pulse"
              : post.isFeatured
                ? "fa-solid fa-star text-yellow-400"
                : "fa-regular fa-star"
            }
          `}/>
          <span className="font-medium">{post.isFeatured ? "Featured" : "Feature Post"}</span>
          {featureMutation.isPending && (
            <span className="text-xs text-gray-400 italic">(updating...)</span>
          )}
        </div>
      )}
      {isAdmin && (
        <div 
          className="flex items-center gap-3 p-1.5 cursor-pointer hover:bg-white rounded-lg transition-all duration-200" 
          onClick={handlePublish}
        >
          <i className={`
            ${publishMutation.isPending
              ? post.isPublished
                ? "fa-solid fa-eye-slash animate-pulse"
                : "fa-solid fa-eye animate-pulse"
              : post.isPublished
                ? "fa-solid fa-eye text-green-500"
                : "fa-solid fa-eye-slash text-gray-400"
            }
          `}/>
          <span className="font-medium">{post.isPublished ? "Published" : "Publish Post"}</span>
          {publishMutation.isPending && (
            <span className="text-xs text-gray-400 italic">(updating...)</span>
          )}
        </div>
      )}
      {user && (post.user.username === user.username || isAdmin) && (
        <>
          <div 
            className="flex items-center gap-3 p-1.5 cursor-pointer hover:bg-white rounded-lg transition-all duration-200" 
            onClick={handleEdit}
          >
            <i className="fa-solid fa-pen-to-square text-blue-500"></i>
            <span className="font-medium">Edit Post</span>
          </div>
          <div 
            className="flex items-center gap-3 p-1.5 cursor-pointer hover:bg-red-50 rounded-lg transition-colors duration-200" 
            onClick={handleDelete}
          >
            <i className="fa-solid fa-trash text-red-500"></i>
            <span className="text-red-500 font-medium">Delete Post</span>
            {deleteMutation.isPending && (
              <span className="text-xs text-red-400 italic">(deleting...)</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostMenuActions;