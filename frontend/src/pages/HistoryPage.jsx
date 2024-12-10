import { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Trash } from "lucide-react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import { toast } from "react-hot-toast";

const HistoryPage = () => {

  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        setSearchHistory(res.data.content);
        setIsLoading(false);
      } catch (error) {
        setSearchHistory([]);
      }
    }

    getSearchHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center bg-black h-full">
          <Loader className="animate-spin size-10 text-red-600" />
        </div>
      </div>
    )
  }

  const handleDeleteHistory = async (e) => {
    // e.preventDefault();
    try {
      await axios.delete(`/api/v1/search/history/${e.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== e.id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete");
    }
  }

  console.log(searchHistory);

  if (searchHistory.length === 0 || !searchHistory || searchHistory === null) {
    return (
      <div className="h-screen bg-black text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold mb-4">Your search history is empty</h1>
          <p className="text-gray-600">Start searching for movies and TV shows to add them to your history.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="text-white bg-black min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your search history</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory.map((item) => {
            // if (item.image === null) return null;
            return (<div key={item.createdAt} className="bg-gray-800 p-4 rounded flex items-start">
              <img src={SMALL_IMG_BASE_URL + item.image} alt="History image" className="size-16 rounded-full object-cover mr-4"/>
              <div className="flex flex-col">
                <span className="text-lg text-white">{item.title}</span>
                <span className="text-gray-400 text-sm">{formatReleaseDate(item.createdAt)}</span>
              </div>
              <div className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto 
                ${item.searchType === "movie" ? "bg-red-600" : item.searchType === "tv" ? "bg-blue-600" : "bg-green-600"}`}>
                {item.searchType}
              </div>
              <Trash className="size-5 cursor-pointer ml-4 hover:fill-red-600 hover:text-red-600" onClick={() => handleDeleteHistory(item) }/>
            </div>);
          })}
        </div>
      </div>
    </div>
  )
}

export default HistoryPage