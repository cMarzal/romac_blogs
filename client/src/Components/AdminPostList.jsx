import PostListAdminItem from "./PostListAdminItem"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUser, useAuth } from "@clerk/clerk-react";


const AdminPostList = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const isAdmin = user?.publicMetadata?.role === "admin" || false;

    const fetchPosts = async (pageParam, searchParams) => {
        const searchParamsObj = Object.fromEntries([...searchParams]);
        const token = await getToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/admin-posts`, {
            headers: { Authorization: `Bearer ${token}`,},
            params: { page: pageParam, limit: 10, ...searchParamsObj },
        });
        return res.data;
    };

    const [searchParams, setSearchParams] = useSearchParams();


    const {
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status,
    } = useInfiniteQuery({
      queryKey: ["posts", searchParams.toString()],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
    });
  
    if (isFetching) return "Loading...";
    if (error) return "Something went wrong!";
  
    const allPosts = data?.pages?.flatMap((page) => page.posts) || [];
  
    return (
      <div className="flex flex-col gap-6">
      <InfiniteScroll
        dataLength={allPosts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4 className="text-center py-4">Loading more posts...</h4>}
        endMessage={
          <p className="text-center py-4">
            <b>All posts loaded!</b>
          </p>
        }
      >
        <div className="flex flex-col gap-6">
          {allPosts.map((post) => (
            <PostListAdminItem key={post._id} post={post} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
    );
}

export default AdminPostList