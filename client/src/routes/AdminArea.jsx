import AdminPostList from "../components/AdminPostList"
import SideMenu from "../components/SideMenu"
import { useState } from "react"
import { useUser, useAuth } from "@clerk/clerk-react";


const AdminArea = () => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin" || false;
  const [open,setOpen] = useState(false)
  
  if(!isAdmin){
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-semibold text-gray-700">Only an Admin can View this Page!</h1>
      </div>
    )
  }
  
  return (
    <div className="px-4 md:px-8 lg:px-14 xl:px-24 2xl:px-32">
      <div className="space-y-8 mt-[calc(var(--navbar-height)+32px)]">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Administrate Blogs</h1>
          <p className="text-gray-600">Manage your blog posts, update content, and control post visibility.</p>
        </div>
        
        <button 
          onClick={()=> setOpen((prev) => !prev)} 
          className="bg-red-800 text-sm text-white px-4 py-2 rounded-full mb-4 md:hidden hover:bg-red-700 transition-colors"
        >
          {open ? "Close" : "Filter or Search"}
        </button>
        
        <div className="flex flex-col-reverse gap-8 md:flex-row">
          <div className="flex-1">
            <AdminPostList />
          </div>
          <div className={`${open ? "block" : "hidden"} md:block`}>
            <SideMenu/>
          </div>
        </div>
      </div>
    </div>
      
  )
}

export default AdminArea