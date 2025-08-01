import PostList from "../components/PostList"
import SideMenu from "../components/SideMenu"
import { useState } from "react"


const PostListPage = () => {

  const [open,setOpen] = useState(false)

  return (
    <div className="px-4 md:px-8 lg:px-14 xl:px-24 2xl:px-32">
      <div className="space-y-8 mt-[calc(var(--navbar-height)+32px)]">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Search Blogs</h1>
          <p className="text-gray-600">Browse through our collection of articles and find what you're looking for.</p>
        </div>
        
        <button 
          onClick={()=> setOpen((prev) => !prev)} 
          className="bg-red-800 text-sm text-white px-4 py-2 rounded-full mb-4 md:hidden hover:bg-red-700 transition-colors"
        >
          {open ? "Close" : "Filter or Search"}
        </button>
        
        <div className="flex flex-col-reverse gap-8 md:flex-row">
          <div className="flex-1">
            <PostList />
          </div>
          <div className={`${open ? "block" : "hidden"} md:block`}>
            <SideMenu/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostListPage