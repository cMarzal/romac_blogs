import Search from "./Search"
import { Link, useSearchParams, useLocation } from "react-router-dom"
import { useState } from "react"
import { categories } from "../config/categories";
import CategoryIcon from "./CategoryIcon";

const SideMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState(searchParams.get("cat") || "");
    const [activeSort, setActiveSort] = useState(searchParams.get("sort") || "newest");
    const location = useLocation();
    const currentCategory = new URLSearchParams(location.search).get("category") || "";

    const handleFilterChange = (e) => {
      const value = e.target.value;
      if (activeSort !== value) {
        setActiveSort(value);
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          sort: value,
        });
      }
    };

    const handleCategoryChange = (category) => {
      if (activeCategory !== category) {
        setActiveCategory(category);
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          cat: category,
        });
      }
    };

    const sortOptions = [
      { value: "newest", label: "Newest", icon: "🆕" },
      { value: "popular", label: "Most Popular", icon: "🔥" },
      { value: "oldest", label: "Oldest", icon: "⏳" }
    ];

    return (
      <div className="w-full md:w-96 lg:w-[350px] xl:w-[350px] h-max sticky top-8">
        <div className="bg-white rounded-xl shadow-md p-6 space-y-8">
          {/* Search Section */}
          <div className="space-y-3">
            <Search />
          </div>

          {/* Filter Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span>⚡</span> Sort By
            </h2>
            <div className="flex flex-col gap-2">
              {sortOptions.map((option) => (
                <label 
                  key={option.value}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    activeSort === option.value 
                      ? "bg-red-50 text-red-700" 
                      : "hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={activeSort === option.value}
                    onChange={handleFilterChange}
                    className="appearance-none w-4 h-4 border-2 border-red-200 rounded-full cursor-pointer checked:bg-red-600 checked:border-red-600 transition-all duration-200"
                  />
                  <span className="text-lg">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span>📑</span> Categories
            </h2>
            <div className="flex flex-col gap-2">
              {categories.map((category) => {
                // Clone current search params
                const newSearchParams = new URLSearchParams(searchParams.toString());
                if (category.id) {
                  newSearchParams.set("category", category.id);
                } else {
                  newSearchParams.delete("category");
                }
                const searchString = newSearchParams.toString() ? `?${newSearchParams.toString()}` : "";
                return (
                  <Link
                    key={category.id}
                    to={{ pathname: "/posts", search: searchString }}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      currentCategory === category.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <CategoryIcon icon={category.icon} />
                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default SideMenu;