export const categories = [
  {
    id: "",
    name: "All Posts",
    shortName: "All",
    icon: {
      path: "M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z",
      viewBox: "0 0 20 20"
    },
    description: "All blog posts"
  },
  {
    id: "elasticsearch",
    name: "Elasticsearch",
    shortName: "Elastic",
    icon: {
      path: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
      viewBox: "0 0 20 20"
    },
    description: "Articles about Elasticsearch and its ecosystem"
  },
  {
    id: "cybersecurity",
    name: "Cyber Security",
    shortName: "Cyber",
    icon: {
      path: "M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
      viewBox: "0 0 20 20"
    },
    description: "Security-related articles and best practices"
  },
  {
    id: "analysis",
    name: "Data Analysis",
    shortName: "Analysis",
    icon: {
      path: "M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z",
      viewBox: "0 0 20 20"
    },
    description: "Data analysis techniques and methodologies"
  },
  {
    id: "visualization",
    name: "Data Visualization",
    shortName: "Visualization",
    icon: {
      path: "M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z",
      viewBox: "0 0 20 20"
    },
    description: "Data visualization tools and techniques"
  }
];

// Helper function to get category by ID
export const getCategoryById = (id) => {
  return categories.find(cat => cat.id === id);
};

// Helper function to get category name by ID
export const getCategoryName = (id) => {
  const category = getCategoryById(id);
  return category ? category.name : "Uncategorized";
}; 