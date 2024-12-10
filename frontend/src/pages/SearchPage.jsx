import Navbar from "../components/Navbar";
import { useState } from "react";
import { useContentStore } from "../store/content";
import { Search } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
const SearchPage = () => {

  const [activeTab, setActiveTab] = useState("movie");
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setSearchResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchQuery}`);
      setSearchResults(res.data.content);
    } catch (error) {
      if(error.message.includes("404")) {
        setSearchResults([]);
        toast.error("No results found, check your search query");
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "movie" ? "bg-red-600" : "bg-gray-600"
            }`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-600"
            }`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-600"
            }`}
            onClick={() => handleTabClick("person")}
          >
            People
          </button>
        </div>

        <form className="flex gap-2 items-center max-w-2xl mb-8 mx-auto" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={"Search for a "+ activeTab }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-600 max-w-6xl w-full mx-auto focus:ring focus:outline-none"
          />

          <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
            <Search className="size-6" />
          </button>
        </form>

        <div className="mt-8">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.map((content) => {
                if (!content.profile_path && !content.poster_path) return null;
                return (<div key={content.id} className="bg-gray-800 rounded p-4">
                { (activeTab === "person") ? (
                  <div>
                    <img src={ ORIGINAL_IMG_BASE_URL + content.profile_path} alt={content.name} className="max-h-96 rounded mx-auto" />
                    <h2 className="text-xl font-bold mt-2">{content.name}</h2>
                  </div>
                ) : 
                (
                  <Link to={`/watch/${content.id}`} onClick={() => setContentType(activeTab)}>
                    <img 
                      src={ ORIGINAL_IMG_BASE_URL + content.poster_path}
                      alt={content.name } 
                      className="max-h-96 rounded mx-auto" 
                    />
                    <h2 className="text-xl font-bold mt-2">{content.name}</h2>
                  </Link>
                ) }
              </div>)
              })}
            </div>
          ) : "" }
        </div>
      </div>
    </div>
  )
}

export default SearchPage