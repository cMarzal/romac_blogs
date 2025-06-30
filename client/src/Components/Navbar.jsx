import { useState, useRef, useEffect } from "react"
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import Search from "./Search";
import { categories } from "../config/categories";
import CategoryIcon from "./CategoryIcon";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  const [scrolled, setScrolled] = useState(false);

  // Refs for dropdowns
  const desktopCategoriesRef = useRef(null);
  const mobileCategoriesRef = useRef(null);

  // Scroll handler for background color
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside handler for desktop categories
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopCategoriesRef.current && !desktopCategoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Click outside handler for mobile categories
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileCategoriesRef.current && !mobileCategoriesRef.current.contains(event.target)) {
        setIsMobileCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handler for navigation links and search
  const handleNavLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setOpen(false);
    setIsMobileCategoriesOpen(false);
    setIsCategoriesOpen(false);
  };

  return (
    <nav className="fixed top-2 z-[100] w-full lg:top-4">
      <div className="container box-border !max-w-[1672px] !px-6 md:!px-9">
        {/* Overlay for mobile menu */}
        {open && (
          <div className="fixed inset-0 z-40 bg-white md:hidden" style={{background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 20%, rgba(255,106,0,0.5) 50%, rgba(238,9,121,0.4) 80%, rgba(0,195,255,0.3) 100%)'}}></div>
        )}
        <div className={`relative flex h-[var(--navbar-height)] w-full items-center justify-between rounded-lg border border-transparent px-2 py-1.5 transition-[box-shadow_background-color_border-color] duration-300 motion-reduce:transition-none lg:grid lg:grid-cols-[1fr_auto_1fr] lg:rounded-2xl lg:py-[0.4375rem] lg:pr-[0.4375rem] ${scrolled ? 'bg-white shadow-[0px_5px_18px_rgba(204,_204,_204,_0.5)]' : 'bg-transparents shadow-none'}`}>
          {/* LOGO */}
          <Link to="/" className="relative w-fit flex items-center gap-2 overflow-hidden md:px-3 font-bold text-gray-900 hover:text-black transition-colors" onClick={handleNavLinkClick}>
            <Image src="logo_nb.png" alt="logo" className="w-6 h-6 md:w-7 md:h-7"/>
            <span className="font-sans font-extrabold uppercase text-xl md:text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Romac Blogs
            </span>
          </Link>

          {/* MOBILE MENU */}
          <div className="lg:hidden">
            {/* MOBILE BUTTON */}
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Overlay for mobile menu, before the menu so it is below in z-index */}
            {open && (
              <div className="fixed inset-0 z-40 bg-gray-100 lg:hidden"></div>
            )}

            {/* MOBILE MENU */}
            <div
              className={`w-full h-screen flex flex-col items-center justify-start py-8 gap-6 absolute top-16 transition-all ease-in-out ${open ? "right-0 z-50" : "-right-full"}`}
              style={{background: open ? 'none' : undefined}}
            >
              {/* Close button for mobile menu */}
              {open && (
                <button
                  className="absolute top-4 right-4 z-50 p-3 rounded-full bg-gray-200 hover:bg-gray-300 text-3xl text-gray-700"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  &times;
                </button>
              )}
              <Link to="/" className="px-4 py-2 rounded-lg text-lg font-medium text-gray-900 hover:text-black hover:bg-gray-200 transition-colors" onClick={handleNavLinkClick}>Home</Link>
              
              {/* Mobile Categories Dropdown */}
              <div className="w-full max-w-xs px-4" ref={mobileCategoriesRef}>
                <button
                  onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg text-lg font-medium text-gray-900 hover:text-black hover:bg-gray-200 transition-colors"
                >
                  <span>Categories</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isMobileCategoriesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isMobileCategoriesOpen && (
                  <div className="mt-2 bg-white rounded-xl shadow-lg py-2 border border-gray-100">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={category.id ? `/posts?cat=${category.id}` : "/posts"}
                        onClick={handleNavLinkClick}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-50 transition-colors text-gray-700 hover:text-black"
                      >
                        <CategoryIcon icon={category.icon} />
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/posts?sort=popular" className="px-4 py-2 rounded-lg text-lg font-medium text-gray-900 hover:text-black hover:bg-gray-200 transition-colors" onClick={handleNavLinkClick}>Most Popular</Link>
              <Link to="/about" className="px-4 py-2 rounded-lg text-lg font-medium text-gray-900 hover:text-black hover:bg-gray-200 transition-colors" onClick={handleNavLinkClick}>About</Link>
              <div className="w-full max-w-xs px-4">
                <Search onResult={handleNavLinkClick} />
              </div>
              <SignedOut>
                <Link to="/login" onClick={handleNavLinkClick}>
                  <button className="px-6 py-2.5 rounded-full bg-gray-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 transition-colors font-medium shadow-sm border border-blue-100">
                    Login
                  </button>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/"/>
              </SignedIn>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="col-start-2 gap-5 px-2 font-medium xl:gap-6 hidden lg:flex items-center">
            <Link to="/posts?sort=popular" className="px-3 py-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-200 transition-colors font-medium" onClick={handleNavLinkClick}>Most Popular</Link>
            {/* Categories Dropdown */}
            <div className="relative hidden lg:block" ref={desktopCategoriesRef}>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-200 transition-colors font-medium"
              >
                <span>Categories</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/posts?category=${category.id}`}
                      onClick={handleNavLinkClick}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <CategoryIcon icon={category.icon} />
                      <span className="ml-2">{category.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/about" className="px-3 py-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-200 transition-colors font-medium" onClick={handleNavLinkClick}>About</Link>
            {user && role === "admin" && (
              <Link to="/admin-area" className="px-3 py-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-200 transition-colors font-medium" onClick={handleNavLinkClick}>Admin Area</Link>
            )}
          </div>
          <div className="col-start-3 hidden w-full justify-end gap-2 lg:flex items-center">
            <div className="w-64">
              <Search onResult={handleNavLinkClick} />
            </div>
            <SignedOut>
              <Link to="/login" onClick={handleNavLinkClick}>
                <button className="px-6 py-2.5 rounded-2xl bg-gray-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 transition-colors font-medium shadow-sm border border-blue-100">
                  Login
                </button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/"/>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;