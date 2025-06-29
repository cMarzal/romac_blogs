import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-indigo-50 to-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-32 mt-6 pt-[var(--navbar-height)]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
