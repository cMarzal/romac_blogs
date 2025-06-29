const CategoryIcon = ({ icon }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5 text-blue-500" 
      viewBox={icon.viewBox} 
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
};

export default CategoryIcon; 