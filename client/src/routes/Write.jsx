import { useAuth, useUser } from "@clerk/clerk-react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../Components/Upload";
import Image from "../Components/Image";
import { categories } from "../config/categories";

const Write = () => {
  const {isLoaded, isSignedIn} = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPlainText, setIsPlainText] = useState(false);

  useEffect(() => {
      img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const navigate = useNavigate();
  
  const { getToken } = useAuth();
  
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
  });

  const formatHTML = (html) => {
    let formatted = '';
    let indent = 0;
    const tab = '  ';
  
    // Clean up ReactQuill specific elements and attributes
    html = html
      // Remove ql-ui spans that ReactQuill adds
      .replace(/<span class="ql-ui"[^>]*><\/span>/g, '')
      // Remove data-list attributes from li elements
      .replace(/<li[^>]*data-list="[^"]*"[^>]*>/g, (match) => {
        return match.replace(/\s*data-list="[^"]*"/g, '');
      })
      // Clean up any remaining empty spans
      .replace(/<span[^>]*><\/span>/g, '')
      // Clean up whitespace between tags
      .replace(/>\s+</g, '><');
  
    // Split by tag boundaries
    const elements = html.split(/(?=<)|(?<=>)/g).filter(e => e.trim() !== '');
  
    elements.forEach(element => {
      if (element.match(/^<\/\w/)) {
        indent = Math.max(indent - 1, 0); // prevent indent from going negative
      }
  
      formatted += tab.repeat(indent) + element.trim() + '\n';
  
      // Increase indent only for opening tags that are not self-closing or void
      if (
        element.match(/^<\w[^>]*[^/]>$/) && 
        !element.startsWith('<input') &&
        !element.startsWith('<br') &&
        !element.startsWith('<img') &&
        !element.startsWith('<hr') &&
        !element.startsWith('<meta') &&
        !element.startsWith('<link')
      ) {
        indent += 1;
      }
    });
  
    return formatted.trim();
  };

  const handleEditorToggle = () => {
    if (!isPlainText) {
      // When switching to HTML view, format the content
      setValue(formatHTML(value));
    } else {
      // When switching back to visual editor, remove extra whitespace
      setValue(value.replace(/\n\s*/g, ''));
    }
    setIsPlainText(!isPlainText);
  };

  if(!isLoaded){
    return <div className="">Loading...</div>
  }

  if (isLoaded && !isSignedIn){
    return <div className="">You should Login!</div>
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cover.filePath) {
      toast.error("Please add a cover image");
      return;
    }
    if (!title.trim()) {
      toast.error("Please add a title");
      return;
    }
    if (!description.trim()) {
      toast.error("Please add a description");
      return;
    }
    const data = {
      img: cover.filePath || "",
      title: title,
      categories: selectedCategories,
      desc: description,
      content: value,
    };

    mutation.mutate(data);
  };

  // Check if all required fields are filled
  const isFormValid = cover.filePath && title.trim() && description.trim();

  return (
    <div className='min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col gap-6 bg-white rounded-2xl shadow-lg p-8'>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
        <span>✍️</span> Create New Post
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <div className="relative">
          {cover.filePath ? (
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
              <Image
                src={cover.filePath}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Upload type="image" setProgress={setProgress} setData={setCover}>
                  <button type="button" className="px-4 py-2 bg-white/90 text-gray-700 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                    Change cover image
                  </button>
                </Upload>
              </div>
            </div>
          ) : (
            <Upload type="image" setProgress={setProgress} setData={setCover}>
              <button type="button" className="w-full h-[150px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:border-gray-400 transition-colors bg-gray-50">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">Add a cover image</p>
                </div>
              </button>
            </Upload>
          )}
        </div>
        <input 
          className="text-3xl font-semibold bg-gray-50 rounded-xl p-3 outline-none border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" 
          type="text" 
          placeholder="My Post Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex flex-col gap-2">
          <div className="relative">
            <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border border-gray-200 rounded-xl min-h-[42px] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-blue-50 text-blue-700 rounded-md"
                >
                  {categories.find(c => c.id === category)?.name}
                  <button
                    type="button"
                    onClick={() => setSelectedCategories(prev => prev.filter(c => c !== category))}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ))}
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value && !selectedCategories.includes(e.target.value)) {
                    setSelectedCategories(prev => [...prev, e.target.value]);
                  }
                }}
                className="flex-1 min-w-[120px] bg-transparent border-none focus:ring-0 text-sm text-gray-500"
              >
                <option value="" disabled>Select categories...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <textarea 
          className="p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none" 
          placeholder="A short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              <button className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Add Image</span>
              </button>
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              <button className="p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <span className="text-sm font-medium">Add Video</span>
              </button>
            </Upload>
            <button
              type="button"
              onClick={handleEditorToggle}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span>{isPlainText ? "Visual Editor" : "HTML Editor"}</span>
            </button>
          </div>
          {isPlainText ? (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 min-h-[300px] max-h-[600px] rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all p-4 font-mono text-sm"
              placeholder="Enter your HTML content here..."
              readOnly={0 < progress && progress < 100}
            />
          ) : (
            <ReactQuill 
              theme="snow" 
              className="flex-1 min-h-[300px] max-h-[600px] rounded-xl bg-gray-50 border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all [&_.ql-container]:max-h-[calc(600px-42px)] [&_.ql-container]:overflow-y-auto" 
              value={value} 
              onChange={setValue}
              readOnly={0 < progress && progress < 100}
            />
          )}
        </div>
        <div className="flex justify-end">
          <button 
            disabled={mutation.isPending || (0 < progress && progress < 100) || !isFormValid}
            className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white font-medium rounded-xl mt-4 px-6 py-2.5 w-48 shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:from-red-300 disabled:to-red-200 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Publish</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;